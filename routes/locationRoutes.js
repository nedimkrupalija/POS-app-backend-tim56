const express = require('express');

const locationsController = require('../controllers/locationController.js') 
const router = express.Router();


router.get('/',locationsController.getLocations);
router.post('/',locationsController.createLocation);
router.put('/:id',locationsController.updateLocation);
router.delete('/:id',locationsController.deleteLocation);

module.exports = router