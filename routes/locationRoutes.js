const express = require('express');

const locationsController = require('../controllers/locationController.js') 
const adminMiddleware = require('../middleware/authAdmin.js');
const router = express.Router();


router.get('/',adminMiddleware,locationsController.getLocations);
router.post('/',adminMiddleware,locationsController.createLocation);
router.put('/:id',adminMiddleware,locationsController.updateLocation);
router.delete('/:id',adminMiddleware,locationsController.deleteLocation);

module.exports = router