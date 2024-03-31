const express = require('express');
const posController = require('../controllers/posController.js') 

const router = express.Router();

router.get('/',posController.getPOS);

router.post('/',posController.createPOS);

router.put('/:id',posController.updatePOS);

router.delete('/:id',posController.deletePOS);

module.exports = router