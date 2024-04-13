const express = require('express');

const router = express.Router();

const locationsController = require('../controllers/locationController.js');

const adminMiddleware = require('../middleware/authAdmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);

router.get('/',adminMiddleware,locationsController.getLocations);
router.post('/',adminMiddleware,locationsController.createLocation);

router.get('/:id',adminMiddleware,locationsController.getLocationsUnique)
router.put('/:id',adminMiddleware,locationsController.updateLocation);
router.delete('/:id',adminMiddleware,locationsController.deleteLocation);

router.get('/:id/tables',locationsController.getTablesForLocation);
router.post('/:id/tables',adminMiddleware,locationsController.createTablesForLocation);

module.exports = router;
