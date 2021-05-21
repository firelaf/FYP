mysql = require("mysql");

//MYSQL
const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "userdata",
  insecureAuth: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = db;
