//Requires
const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes");
const app = express();

app.use(express.static(path.join(__dirname, "views")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
app.use(
  session({
    secret: "ShhSuperSecretDontTellAnyone",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 43200000 }, //12 hours
  })
);

//Routes
app.use("/", routes);

//Ports and listening
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}...`));
