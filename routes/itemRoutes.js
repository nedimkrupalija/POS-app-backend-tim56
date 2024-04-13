const express = require('express');

const router = express.Router();

const itemController = require('../controllers/itemController.js');

const authAdminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);

router.get('/', itemController.getItems)
router.post('/', authAdminMiddleware, itemController.createItem)

router.get('/:id',itemController.getUniqueItem)
router.put('/:id',authAdminMiddleware, itemController.updateItem)
router.delete('/:id',authAdminMiddleware, itemController.deleteItem);

module.exports = router;
