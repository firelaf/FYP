const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../private/database_connection');

//Splitting the routing into smaller files
const db_model = require('./database');
const dashboard = require('./dashboard');
const login = require('./login');

router.use('/login', login);
router.use('/dashboard', dashboard);
router.use('/database', db_model);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;