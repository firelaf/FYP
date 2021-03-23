const db = require("./database_connection");

module.exports = (userType, shift, httpRes) => {
  let sql;
  if (userType === "S") {
    sql =
      "SELECT * FROM requests WHERE requester_id = ? AND NOT (endTime <= ? OR startTime >= ?) AND requestDate = '2021-?-?';";
  } else if (userType === "W") {
    sql =
      "SELECT * FROM availability WHERE worker_id = ? AND NOT (unavailableTo <= ? OR unavailableFrom >= ?) AND availableDate = '2021-?-?';";
  }
  db.query(
    sql,
    [
      shift.requester_id,
      shift.startTime,
      shift.endTime,
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
      "INSERT INTO requests(startTime, endTime, requestDate, requester_id, session_id) VALUES(?, ?, '2021-?-?', ?, ?);";
    redirectRoute = "/dashboard/student";
  } else if (userType === "W") {
    sql =
      "INSERT INTO availability(unavailableFrom, unavailableTo, availableDate, worker_id, setByWorker) VALUES(?, ?, '2021-?-?', ?, TRUE);";
    redirectRoute = "/dashboard/worker";
  }

  if (sql) {
    db.query(
      sql,
      [
        shift.startTime, //Time where the session/unavailability window beings
        shift.endTime, //Time when it ends
        shift.month,
        shift.day,
        shift.requester_id, //User ID session cookie
        shift.session_id,
      ],
      (err, result) => {
        httpRes.redirect(redirectRoute);
      }
    );
  }
}
