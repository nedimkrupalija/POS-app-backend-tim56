const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController.js');

const authAdminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);

router.get('/',authAdminMiddleware,orderController.getOrders);
router.post('/', authAdminMiddleware, orderController.createOrder);

router.put('/:id', authAdminMiddleware, orderController.updateOrder);
router.delete('/:id', authAdminMiddleware, orderController.deleteOrder);

router.post('/finish/:id', authAdminMiddleware, orderController.finishOrder);
router.post("/deduct/:id",authAdminMiddleware,orderController.deductFromStorage);

module.exports = router;
