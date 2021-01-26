//Requires
const path =  require('path');
const fs =  require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const app = express();

app.use(express.static(path.join(__dirname, 'views')));

const urlEncodedParser = bodyParser.urlencoded({extended: true});

//Routes
app.use('/', routes);

//Ports and listening
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}...`));