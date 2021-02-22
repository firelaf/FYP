const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
router = express.Router();

const db = require('../private/database_connection');
const urlEncodedParser = bodyParser.urlencoded({extended: true});




//Process for sending requests from student
router.post('/sendSupportRequest', urlEncodedParser, (req, res) =>
{
    console.log(req.body);
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let day = req.body.day;
    let month = req.body.month;

    //
    let sql = `INSERT INTO requests(startTime, endTime, requestDate, requester_id) VALUES(?, ?, '2021-?-?', ?);`;

    console.log(sql); //DEBUG
    
    //Month and day come as strings (in between ' ' ) so they need to be parsed as int.
    db.query(sql, [startTime, endTime, parseInt(month), parseInt(day), req.session.user_id]);

    res.redirect('/dashboard/student');
});




//Pulling the requests from the database to view by the admin or student
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
        sql = `SELECT * FROM requests WHERE requester_id=?;`;
    }

    db.query(sql, [req.session.user_id], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
})

module.exports = router;