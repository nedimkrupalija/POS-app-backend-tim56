const express = require('express');
const storageController = require('../controllers/storageController.js')
const adminMiddleware = require('../middleware/authAdmin.js');

const router = express.Router();

router.get('/:id',/*adminMiddleware,*/storageController.getStorageUnique);
router.get('/',adminMiddleware,storageController.getStorage);
router.get('/:id',adminMiddleware,storageController.getStorageUnique);
router.get('/:id/status',adminMiddleware,storageController.getStorageStatus);
router.get('/:id/items',adminMiddleware, storageController.getAvailableItemsForStorage);

router.post('/',adminMiddleware,storageController.createStorage);

router.put('/:id',adminMiddleware,storageController.updateStorage)

router.delete('/:id',adminMiddleware,storageController.deleteStorage);

module.exports = router
