const express = require('express');

const authController = require('../controllers/authController.js');
const router = express.Router();

router.post('/login', authController.login);
router.get('/test',authController.test )

module.exports = router;