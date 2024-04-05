const express = require('express');

const authController = require('../controllers/authController.js');
const authAdminMiddleware = require('../middleware/authAdmin.js');
const orderController = require('../controllers/orderController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();
router.use(authMiddleware.addJwtHeader);

router.get('/',  authAdminMiddleware, orderController.getOrders);
router.post('/', authAdminMiddleware, orderController.createOrder);
router.put('/:id', authAdminMiddleware, orderController.updateOrder);
router.delete('/:id', authAdminMiddleware, orderController.deleteOrder);
router.post('/finish/:id', authAdminMiddleware, orderController.finishOrder);

module.exports = router;