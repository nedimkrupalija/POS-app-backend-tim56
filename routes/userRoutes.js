const express = require('express');

const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const storageController = require('../controllers/storageController.js');
const userController = require('../controllers/userController.js');

const router = express.Router();
router.use(authMiddleware.addJwtHeader);

router.post('/tables',userController.assignTables);

module.exports = router;