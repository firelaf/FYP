const express = require('express');
const path = require('path');
const router = express.Router();

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
    res.sendFile(path.join(__dirname, '..', 'views', 'js', 'dropdown.js'));
});

module.exports = router;