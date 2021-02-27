mysql = require("mysql");

//MYSQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Zcxvfgrt56!",
  database: "userdata",
  insecureAuth: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = db;
