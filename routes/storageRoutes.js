const express = require('express');
const storageController = require('../controllers/storageController.js') 
const router = express.Router();

router.get('/:id',storageController.getStorageUnique);
router.get('/',storageController.getStorage);
router.get('/:id',storageController.getStorageUnique);

router.post('/',storageController.createStorage);

router.put('/:id',storageController.updateStorage)

router.delete('/:id',storageController.deleteStorage);

module.exports = router
