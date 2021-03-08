const db = require("./database_connection");
const srtToIntTime = require("./strToIntTime");

module.exports = (startTime, endTime, day, month) => {
  function checkAvailability(workerID) {
    db.query(
      "SELECT * FROM availability WHERE worker_id=?",
      [workerID],
      (err, result) => {
        console.log(result);
      }
    );
  }

  function checkWorkers(numOfWorkers, workerIDs) {
    let availability = {};

    workerIDs.forEach((item, index) => {
      availability[workerIDs[index]] = false;
      checkAvailability(workerIDs[index]);
    });

    console.log(availability);
  }

  function getWorkers() {
    db.query(
      "SELECT user_id FROM login WHERE user_type=?",
      ["W"],
      (err, result) => {
        let numOfWorkers = 0;
        let workerIDs = [];

        result.forEach((item, index) => {
          numOfWorkers++;
          workerIDs[index] = result[index].user_id;
        });

        checkWorkers(numOfWorkers, workerIDs);
      }
    );
  }

  getWorkers();

  // function getWorkerIDs(numOfWorkers) {
  //   let sql = "SELECT *";
  //   db.query;
  // }

  // function getNumWorkers() {
  //   let sql = "SELECT COUNT(*) FROM login WHERE user_type=?;";

  //   db.query(sql, ["W"], (err, result) => {
  //     numOfWorkers = result[0]["COUNT(*)"];
  //     getWorkerIDs(numOfWorkers);
  //   });
  // }

  // getNumWorkers();
};
