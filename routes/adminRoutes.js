const express = require('express');

const adminController = require('../controllers/adminController.js');
const router = express.Router();

router.get('/users', adminController.getUsers);
router.get('/administrators', adminController.getAdministrators);

router.put('/users/:id', adminController.updateUser);
router.put('/administrators/:id', adminController.updateAdministrator);

router.delete('/users/:id', adminController.deleteUser);
router.delete('/administrators/:id', adminController.deleteAdministrator);

router.post('/users', adminController.createUser);
router.post('/administrators', adminController.createAdministrator);

module.exports = router;