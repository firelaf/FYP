const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({extended: true});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
});

router.post('/process', urlEncodedParser, (req, res) => {
    console.log(req.body);
    switch(req.body.lEmail)
    {
        case 'admin@g':
            res.redirect('/dashboard/admin');
            break;
        case 'student@g':
            res.redirect('/dashboard/student');
            break;
        case 'worker@g':
            res.redirect('/dashboard/worker');
            break;
        default:
            res.sendStatus('404');
    }
});

module.exports = router;