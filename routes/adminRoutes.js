const express = require('express');

const adminController = require('../controllers/adminController.js');
const router = express.Router();
const authAdminMiddleware = require('../middleware/authAdmin.js');    
const authSuperadminMiddleware = require('../middleware/authSuperadmin.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware.addJwtHeader);


router.get('/users',  authAdminMiddleware, adminController.getUsers);
router.get('/administrators', authSuperadminMiddleware, adminController.getAdministrators);

router.put('/users/:id', authAdminMiddleware, adminController.updateUser);
router.put('/administrators/:id', authSuperadminMiddleware, adminController.updateAdministrator);

router.delete('/users/:id',authAdminMiddleware,  adminController.deleteUser);
router.delete('/administrators/:id', authSuperadminMiddleware, adminController.deleteAdministrator);

router.post('/users', authAdminMiddleware, adminController.createUser);
router.post('/administrators',authSuperadminMiddleware, adminController.createAdministrator);

module.exports = router;