const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const db = require("../private/database_connection");
const sorter = require("../private/sorting");
const validateDateTime = require("../private/validateDateTime");
const addSessionToDB = require("../private/addSessionToDB");

//Process for sending requests from student
router.post("/sendRequest", (req, res) => {
  //console.log(req.body["practical-type"]);
  let userType = req.session.user_type;

  let practicalSupport = false;
  let noteTakingSupport = false;

  if (req.body["practical-type"]) {
    practicalSupport = true;
  }
  if (req.body["note-taking-type"]) {
    noteTakingSupport = true;
  }

  //Shift is a collective term for both help requests from the students and availability timeframes for the workers
  const shift = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    day: +req.body.day,
    month: +req.body.month,
    details: req.body.details,
    practicalSupport: practicalSupport,
    noteTakingSupport: noteTakingSupport,
    requester_id: req.session.user_id,
    session_id: uuidv4(),
  };

  console.log(req.body);

  if (req.session.isAuth) {
    if (validateDateTime(shift)) {
      //This function call fires the chain of queries that check if the timeframe the user is requesting intersects with
      //a timeframe they've already requested
      addSessionToDB(userType, shift, res);

      if (userType === "S") {
        sorter(shift);
      }
    } else {
      res.status(403).send("Invalid date-time");
    }
  } else res.status(404).send("You have not logged in!");
});

//Pulling the requests from the database to view by the admin or student
router.post("/requests", (req, res) => {
  let sql;
  let userType = req.session.user_type;

  //If the user is of type 'Admin'
  if (userType === "A") {
    sql = "SELECT * FROM requests;";
  } else if (userType === "S") {
    sql = "SELECT * FROM requests WHERE requester_id=?;";
  } else if (userType === "W") {
    sql = "SELECT * FROM requests WHERE assignedTo_id=?";
  }

  if (sql) {
    db.query(sql, [req.session.user_id], (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  }
  if (!req.session.isAuth) {
    res.status(403).send("You have not logged in!");
  }
});

router.post("/availability", (req, res) => {
  let userType = req.session.user_type;

  function sendResults(sql) {
    if (sql) {
      db.query(sql, [req.session.user_id], (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
  }

  switch (userType) {
    case "A":
      sendResults("SELECT * FROM availability WHERE setByWorker = TRUE;");
      break;
    case "W":
      sendResults(
        "SELECT * FROM availability WHERE worker_id=? AND setByWorker = TRUE;"
      );
      break;
    default:
      res.status(403).send("You do not have access!");
  }
});

module.exports = router;
