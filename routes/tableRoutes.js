const express = require('express');
const storageController = require('../controllers/storageController.js')
const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();
router.use(authMiddleware.addJwtHeader);

router.get('/:id',adminMiddleware,storageController.getStorageUnique);

module.exports=router;