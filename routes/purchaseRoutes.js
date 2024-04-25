const express = require('express');

const router = express.Router();

const purchaseController = require('../controllers/purchaseController.js');

const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/',purchaseController.getAllPurchaseOrders);
router.post('/',purchaseController.createPurchaseOrder);

router.get('/:id',purchaseController.getPurchaseOrderById);
router.put('/:id',purchaseController.updatePurchaseOrder);
router.delete('/:id',purchaseController.deletePurchaseOrder);

router.put('/status/:id',purchaseController.updatePurchaseStatus);


router.get('/location/:id', purchaseController.getPurchaseOrderByLocationId);
module.exports = router;
