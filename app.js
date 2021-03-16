//Requires
const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes");
const app = express();

app.use(express.static(path.join(__dirname, "views")));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use("/", routes);

//Ports and listening
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}...`));
