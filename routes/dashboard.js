const express = require('express');
const path = require('path');
const router = express.Router();

//Routing for the 3 dashboards
router.get('/admin', (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard', 'admin.html'));
});

router.get('/student', (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard', 'student.html'));
});

router.get('/worker', (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', 'views', 'dashboard', 'worker.html'));
});

module.exports = router;