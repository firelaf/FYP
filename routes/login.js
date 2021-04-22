const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("../private/database_connection");

function userRedirect(userType, res) {
  switch (userType) {
    case "A":
      res.redirect("/dashboard/admin");
      break;
    case "W":
      res.redirect("/dashboard/worker");
      break;
    case "S":
      res.redirect("/dashboard/student");
  }
}

router.get("/", (req, res) => {
  //Checks if the user is logged in (isAuth Session Cookie)
  if (req.session.isAuth) {
    userRedirect(req.session.user_type, res);
  } else {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
  }
});

router.post("/process", (req, res) => {
  let email = req.body.loginEmail;
  let pass = req.body.loginPass;
  console.log(req.body);

  //Queries the login table from the database
  let sql = `SELECT * FROM login WHERE email=?`;
  db.query(sql, [email], (err, result) => {
    if (err) res.status(404).send("Something went wrong, please try again");

    //Checks if there is a result from the query
    if (!result[0]) {
      res.status(404).send("No match");
    } else {
      //If there is one, check the password
      if (pass === result[0].pass) {
        /* If the password is correct, record the user's data into the Session
                and keep them logged in (isAuth) */
        req.session.user_id = result[0].user_id;
        req.session.isAuth = true;
        req.session.user_type = result[0].user_type;

        res.status(202).send(req.session.user_type);
        //userRedirect(req.session.user_type, res);
      } else {
        res.status(404).send("Wrong Passoword");
      }
    }
  });
});

//Clears the session data
router.get("/logout", (req, res) => {
  req.session.isAuth = false;
  req.session.user_id = null;
  req.session.user_type = null;
  res.redirect("/");
});

router.get("/isAuth", (req, res) => {
  if (req.session.isAuth) res.status(202).send(req.session.user_type);
  else res.status(403).send(false);
});

module.exports = router;
