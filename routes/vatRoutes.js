const express = require('express');
const router = express.Router();
const vatController = require('../controllers/vatController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const adminMiddleware = require('../middleware/authAdmin.js');

router.use(authMiddleware.addJwtHeader);
router.use(adminMiddleware);

router.get('/',vatController.getVAT);   
router.post('/',vatController.createVAT);
router.put('/:id',vatController.updateVAT);
router.delete('/:id',vatController.deleteVAT);


module.exports = router