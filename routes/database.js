const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
router = express.Router();

const db = require('../private/database_connection');

const urlEncodedParser = bodyParser.urlencoded({extended: true});

//Process for sending requests from student to worker
router.post('/sendSupportRequest', urlEncodedParser, (req, res) =>
{
    console.log(req.body);
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let day = req.body.day;
    let month = req.body.month;

    //TO-DO PREPARED STATEMENT!!!!
    let sql = `INSERT INTO requests(startTime, endTime, requestDate, requester_id) 
    VALUES('${startTime}', '${endTime}', '2021-${month}-${day}', ${req.session.user_id});`;

    console.log(sql);
    db.query(sql);

    res.redirect('/dashboard/student');
});

//Pulling the requests from the database
router.post('/requests', (req, res) =>
{
    let sql;
    //If the user is of type 'Admin'
    if(req.session.user_type === 'A')
    {
        sql = 'SELECT * FROM requests;';
    }
    else
    {
        //TO-DO PREPARED STATEMENT!!!
        sql = `SELECT * FROM requests WHERE requester_id=${req.session.user_id};`;
    }
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
})

module.exports = router;