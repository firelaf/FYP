const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("../private/database_connection");

router.get("/", (req, res) => {
  //Checks if the user is logged in (isAuth Session Cookie)
  if (req.session.isAuth) {
    //TO-DO - MAKE THIS A FUNCTION!!!
    switch (req.session.user_type) {
      case "A":
        res.redirect("/dashboard/admin");
        break;
      case "W":
        res.redirect("/dashboard/worker");
        break;
      case "S":
        res.redirect("/dashboard/student");
    }
  } else {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
  }
});

router.post("/process", (req, res) => {
  let email = req.body.loginEmail;
  let pass = req.body.loginPass;

  //Queries the login table from the database
  let sql = `SELECT * FROM login WHERE email=?`;
  db.query(sql, [email], (err, result) => {
    if (err) res.status(404).send("Something went wrong, please try again");

    //Checks if there is a result from the query
    if (!result[0]) {
      res.send("No match"); //TODO MAKE A REJECTION PROCESS
    } else {
      //If there is one, check the password
      if (pass === result[0].pass) {
        /* If the password is correct, record the user's data into the Session
                and keep them logged in (isAuth) */
        req.session.user_id = result[0].user_id;
        req.session.isAuth = true;
        req.session.user_type = result[0].user_type;

        //TO-DO - MAKE THIS A FUNCTION
        switch (result[0].user_type) {
          case "A":
            res.redirect("/dashboard/admin");
            break;
          case "W":
            res.redirect("/dashboard/worker");
            break;
          case "S":
            res.redirect("/dashboard/student");
        }
      } else {
        res.status(404).send("Wrong Passoword"); //TODO - MAKE A REJECTION PROCESS
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

module.exports = router;
