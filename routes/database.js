const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
router = express.Router();

const db = require("../private/database_connection");
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

//Process for sending requests from student
router.post("/sendRequest", urlEncodedParser, (req, res) => {
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let day = req.body.day;
  let month = req.body.month;

  let sql;
  let redirectRoute;

  if (req.session.user_type === "S") {
    sql = `INSERT INTO requests(startTime, endTime, requestDate, requester_id) VALUES(?, ?, '2021-?-?', ?);`;
    redirectRoute = "/dashboard/student";
  } else if (req.session.user_type === "W") {
    sql = `INSERT INTO availability(unavailableFrom, unavailableTo, availableDate, worker_id) VALUES(?, ?, '2021-?-?', ?);`;
    redirectRoute = "/dashboard/worker";
  }

  //Month and day come as strings (in between ' ' ) so they need to be parsed as int.
  if (sql) {
    db.query(sql, [
      startTime,
      endTime,
      parseInt(month),
      parseInt(day),
      req.session.user_id,
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
  }

  if (sql) {
    db.query(sql, [req.session.user_id], (err, result) => {
      if (err) throw err;
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
