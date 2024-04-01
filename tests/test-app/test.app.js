const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const adminController = require('../../controllers/adminController.js');
const adminRoutes = require('../../routes/adminRoutes.js');
const authRoutes = require('../../routes/authRoutes.js');
const orderRoutes = require('../../routes/orderRoutes.js'); 
const authMiddleware = require('../../middleware/authMiddleware.js');

const app = require('express')();
app.use(bodyParser.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
    cookie: {
        secure: false
    }
}));
app.use('/auth', authRoutes);
app.use('/admin',authMiddleware, adminRoutes);
app.use('/orders',authMiddleware,orderRoutes);

module.exports=app;
