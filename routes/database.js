const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
router = express.Router();

const db = require('../private/database_connection');

const urlEncodedParser = bodyParser.urlencoded({extended: true});

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

    res.redirect('/dashboard/student');
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