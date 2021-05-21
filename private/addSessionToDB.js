const db = require("./database_connection");

module.exports = (userType, shift, httpRes) => {
  let sql;
  if (userType === "S") {
    sql =
      "SELECT * FROM requests WHERE requester_id = ? AND NOT (endTime <= ? OR startTime >= ?) AND requestDate = '?-?-?';";
  } else if (userType === "W") {
    sql =
      "SELECT * FROM availability WHERE worker_id = ? AND NOT (unavailableTo <= ? OR unavailableFrom >= ?) AND availableDate = '?-?-?';";
  }
  db.query(
    sql,
    [
      shift.requester_id,
      shift.startTime,
      shift.endTime,
      shift.year,
      shift.month,
      shift.day,
    ],
    (err, result) => {
      if (!result[0]) {
        addToDB(userType, shift, httpRes);
      } else {
        httpRes.send("Your request intersects with one you've already made");
      }
    }
  );
};

function addToDB(userType, shift, httpRes) {
  let sql;
  let redirectRoute;
  if (userType === "S") {
    sql =
      "INSERT INTO requests(startTime, endTime, requestDate, requester_id, session_id, details, practicalType, noteTakingType) VALUES(?, ?, '?-?-?', ?, ?, ?, ?, ?);";
    redirectRoute = "http://localhost:3000";
  } else if (userType === "W") {
    sql =
      "INSERT INTO availability(unavailableFrom, unavailableTo, availableDate, worker_id, session_id, setByWorker) VALUES(?, ?, '?-?-?', ?,?, TRUE);";
    redirectRoute = "http://localhost:3000";
  }

  if (sql) {
    db.query(
      sql,
      [
        shift.startTime, //Time where the session/unavailability window beings
        shift.endTime, //Time when it ends
        shift.year,
        shift.month,
        shift.day,
        shift.requester_id, //User ID session cookie
        shift.session_id,
        shift.details,
        shift.practicalSupport,
        shift.noteTakingSupport,
      ],
      (err, result) => {
        httpRes.redirect(redirectRoute);
      }
    );
  }
}
