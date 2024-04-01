const express = require('express');

const itemController = require('../controllers/itemController.js');
const authAdminMiddleware = require('../middleware/authAdmin.js');
const router = express.Router();

router.use(authAdminMiddleware);
router.route('/').get(itemController.getItems).post(itemController.createItem);

router.route('/:id').get(itemController.getUniqueItem).put(itemController.updateItem).delete(itemController.deleteItem);

module.exports = router;


