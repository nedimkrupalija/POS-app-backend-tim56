const express = require('express');
const purchaseController = require('../controllers/purchaseController.js'); 
const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');


const router = express.Router();
//router.use(authMiddleware.addJwtHeader);

router.post('/',purchaseController.createPurchaseOrder);

router.get('/:id',purchaseController.getPurchaseOrderById);
router.get('/',purchaseController.getAllPurchaseOrders);

router.put('/:id',purchaseController.updatePurchaseOrder);

router.delete('/:id',purchaseController.deletePurchaseOrder);

module.exports = router