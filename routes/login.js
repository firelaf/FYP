const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../private/database_connection');
const session = require('express-session');

const urlEncodedParser = bodyParser.urlencoded({extended: true});

router.get('/', (req, res) => {
    if(req.session.isAuth)
    {
        switch(req.session.user_type){
            case 'A':
                res.redirect('/dashboard/admin');
                break;
            case 'W':
                res.redirect('/dashboard/worker');
                break;
            case 'S':
                res.redirect('/dashboard/student')
        }
    }
    else
    {
        res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    }
});

router.post('/process', urlEncodedParser, (req, res) => {
    let email = req.body.loginEmail;
    let pass = req.body.loginPass;

    let sql = `SELECT * FROM login WHERE email=?`;
    let query = db.query(sql, [email], (err, result) => {
        if(err) res.status(404).send('Something went wrong, please try again');

        if(!result[0]){
            res.send('No match');
        }
        else {
            if(pass === result[0].pass) {
                req.session.user_id = result[0].user_id;
                req.session.isAuth = true;
                req.session.user_type = result[0].user_type;
                switch(result[0].user_type){
                    case 'A':
                        res.redirect('/dashboard/admin');
                        break;
                    case 'W':
                        res.redirect('/dashboard/worker');
                        break;
                    case 'S':
                        res.redirect('/dashboard/student')
                }
            }
            else
            {
                res.status(404).send('Wrong Passoword');
            }
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.isAuth = false;
    req.session.user_id = null;
    req.session.user_type = null;
    res.redirect('/');
})

module.exports = router;