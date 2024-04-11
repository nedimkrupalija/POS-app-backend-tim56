const express = require('express');
const storageController = require('../controllers/storageController.js')
const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();
router.use(authMiddleware.addJwtHeader);

router.get('/:id',storageController.getStorageUnique);
router.get('/',storageController.getStorage);
router.get('/:id/status',adminMiddleware,storageController.getStorageStatus);
router.get('/:id/items', storageController.getAvailableItemsForStorage);

router.post('/',adminMiddleware,storageController.createStorage);

router.put('/:id',adminMiddleware,storageController.updateStorage)

router.delete('/:id',adminMiddleware,storageController.deleteStorage);

module.exports = router
