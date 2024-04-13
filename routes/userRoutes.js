const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController.js');

const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);

router.post('/tables',userController.assignTables);
router.delete('/tables',userController.unassignTabels);

module.exports = router;
