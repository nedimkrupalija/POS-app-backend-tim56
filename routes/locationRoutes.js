const express = require('express');

const locationsController = require('../controllers/locationController.js') 
const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();
router.use(authMiddleware.addJwtHeader);

router.get('/:id',adminMiddleware,locationsController.getLocationsUnique)
router.get('/',adminMiddleware,locationsController.getLocations);
router.post('/',adminMiddleware,locationsController.createLocation);
router.put('/:id',adminMiddleware,locationsController.updateLocation);
router.delete('/:id',adminMiddleware,locationsController.deleteLocation);
router.get('/:id/tables',locationsController.getTablesForLocation);
router.post('/:id/tables',adminMiddleware,locationsController.createTablesForLocation);

module.exports = router
