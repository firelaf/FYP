const express = require("express");
const mysql = require("mysql");
const path = require("path");
const { uuid } = require("uuidv4");
router = express.Router();

const db = require("../private/database_connection");

const sorter = require("../private/sorting");

//Process for sending requests from student
router.post("/sendRequest", (req, res) => {
  const shift = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    day: req.body.day,
    month: req.body.month,
    requester_id: req.session.user_id,
    session_id: uuid(),
  };

  let sql;
  let redirectRoute;

  if (req.session.user_type === "S") {
    sql = `INSERT INTO requests(startTime, endTime, requestDate, requester_id, session_id) VALUES(?, ?, '2021-?-?', ?, ?);`;
    redirectRoute = "/dashboard/student";
    sorter(shift);
  } else if (req.session.user_type === "W") {
    sql = `INSERT INTO availability(unavailableFrom, unavailableTo, availableDate, worker_id) VALUES(?, ?, '2021-?-?', ?);`;
    redirectRoute = "/dashboard/worker";
  }

  //Month and day come as strings (in between ' ' ) so they need to be parsed as int.
  if (sql) {
    db.query(sql, [
      shift.startTime, //Time where the session/unavailability window beings
      shift.endTime, //Time when it ends
      parseInt(shift.month),
      parseInt(shift.day),
      shift.requester_id, //User ID session cookie
      shift.session_id,
    ]);
  }

  res.redirect(redirectRoute);
});

//Pulling the requests from the database to view by the admin or student
router.post("/requests", (req, res) => {
  let sql;

  //If the user is of type 'Admin'
  if (req.session.user_type === "A") {
    sql = "SELECT * FROM requests;";
  } else if (req.session.user_type === "S") {
    sql = "SELECT * FROM requests WHERE requester_id=?;";
  } else if (req.session.user_type === "W") {
    sql = "SELECT * FROM requests WHERE assignedTo_id=?";
  }

  if (sql) {
    db.query(sql, [req.session.user_id], (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log(req.session.user_type, req.session.user_id);
      res.send(result);
    });
  }
});

router.post("/availability", (req, res) => {
  let sql;

  if (req.session.user_type === "A") {
    sql = "SELECT * FROM availability;";
  } else if (req.session.user_type === "W") {
    sql = "SELECT * FROM availability WHERE worker_id=?;";
  }

  if (sql) {
    db.query(sql, [req.session.user_id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  }
});

module.exports = router;
