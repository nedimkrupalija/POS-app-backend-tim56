const express = require('express');

const router = express.Router();

const posController = require('../controllers/posController.js');

const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);

router.get('/',adminMiddleware,posController.getPOS);
router.post('/',adminMiddleware,posController.createPOS);

router.put('/:id',adminMiddleware,posController.updatePOS);
router.delete('/:id',adminMiddleware,posController.deletePOS);

router.post('/checkout',posController.checkoutPOS);

module.exports = router;
