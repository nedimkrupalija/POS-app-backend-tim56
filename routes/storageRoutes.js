const express = require('express');

const router = express.Router();

const storageController = require('../controllers/storageController.js');

const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);

router.get('/',storageController.getStorage);
router.post('/',adminMiddleware,storageController.createStorage);

router.get('/:id',storageController.getStorageUnique);
router.put('/:id',adminMiddleware,storageController.updateStorage)
router.delete('/:id',adminMiddleware,storageController.deleteStorage);

router.get('/:id/status',adminMiddleware,storageController.getStorageStatus);

router.get('/:id/items', storageController.getAvailableItemsForStorage);

module.exports = router;
