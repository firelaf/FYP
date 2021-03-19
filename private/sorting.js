const db = require("./database_connection");
const getRandInt = require("./getRandInt");

module.exports = (shift) => {
  /* First, make query to get all the availability timeframes 
  which collide with the submitted timeframe. Push all assigned
  workers into an array (unavailableWorkers).
  */
  db.query(
    "SELECT * FROM availability WHERE NOT (unavailableTo <= ? OR unavailableFrom >= ?);",
    [shift.startTime, shift.endTime],
    (err, result) => {
      let unavailableWorkers = [];

      result.forEach((item) => {
        if (!unavailableWorkers.includes(item.worker_id)) {
          unavailableWorkers.push(item.worker_id);
        }
      });

      checkWorkers(unavailableWorkers);
    }
  );

  /* Second, get the user IDs of all workers. Compare that against the
  unavailable workers to get the IDs of all available workers.
  Push all unique available workers' IDs into an array.
  */

  function checkWorkers(unavailableWorkers) {
    db.query(
      "SELECT user_id FROM login WHERE user_type=?;",
      ["W"],
      (err, result) => {
        let availableWorkers = [];

        result.forEach((item) => {
          if (!unavailableWorkers.includes(item.user_id)) {
            availableWorkers.push(item.user_id);
          }
        });

        assignShift(availableWorkers);
      }
    );
  }

  /* Third, select a random available worker to be assigned by generating
  a random index of the array.
  */

  function assignShift(availableWorkers) {
    const chosenWorker = availableWorkers[getRandInt(availableWorkers.length)];
    db.query(
      "UPDATE requests SET assignedTo_id = ? WHERE session_id = ?;",
      [chosenWorker, shift.session_id],
      () => {
        setUnavailable(chosenWorker);
      }
    );
  }

  function setUnavailable(chosenWorker) {
    db.query(
      "INSERT INTO availability(unavailableFrom, unavailableTo, availableDate, worker_id) VALUES(?, ?, '2021-?-?', ?);",
      [shift.startTime, shift.endTime, shift.month, shift.day, chosenWorker]
    );
  }
};
