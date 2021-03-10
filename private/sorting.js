const db = require("./database_connection");
const getRandInt = require("./getRandInt");

module.exports = (shift) => {
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
      console.log(`${unavailableWorkers} are unavailable`);
    }
  );

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

        console.log(`${availableWorkers} are available`);

        assignShift(availableWorkers);
      }
    );
  }

  function assignShift(availableWorkers) {
    console.log(availableWorkers[getRandInt(availableWorkers.length)]);
    console.log(shift.session_id);
    db.query("UPDATE requests SET assignedTo_id = ? WHERE session_id = ?;", [
      availableWorkers[getRandInt(availableWorkers.length)],
      shift.session_id,
    ]);
  }
};
