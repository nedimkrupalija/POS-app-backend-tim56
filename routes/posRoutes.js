const express = require('express');
const posController = require('../controllers/posController.js') 
const adminMiddleware = require('../middleware/authAdmin.js');

const router = express.Router();

router.get('/',adminMiddleware,posController.getPOS);

router.post('/checkout',adminMiddleware,posController.checkoutPOS);
router.post('/',adminMiddleware,posController.createPOS);

router.put('/:id',adminMiddleware,posController.updatePOS);

router.delete('/:id',adminMiddleware,posController.deletePOS);

module.exports = router