const express = require('express');

const authController = require('../controllers/authController.js');
const router = express.Router();

router.get('/test', authController.login);

module.exports = router;