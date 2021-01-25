const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../private/database_connection');

const urlEncodedParser = bodyParser.urlencoded({extended: true});

const dashboard = require('./dashboard');
const login = require('./login');

router.use('/login', login);
router.use('/dashboard', dashboard);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.post('/sendSupportRequest', urlEncodedParser, (req, res) =>
{
    console.log(req.body);
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let day = req.body.day;
    let month = req.body.month;

    let sql = `INSERT INTO requests(startTime, endTime, requestDate, requester_id) VALUES('${startTime}', '${endTime}', '2021-${month}-${day}', 1)`;

    console.log(sql);
    db.query(sql);

    res.send(`Request Received from ${req.body.startTime} to 
    ${req.body.endTime} on ${req.body.day}.${req.body.month}.`);
});

router.post('/all-requests', (req, res) =>
{
    let sql = 'SELECT * FROM requests;';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
})

module.exports = router;