const express = require('express');
const session = require('express-session');

const db = require('./config/db.js');

const cors = require('cors');
const PORT = process.env.PORT || 3000

const authRoutes =      require('./routes/authRoutes');
const authMiddleware =    require('./middleware/authMiddleware.js');

const adminRoutes =     require('./routes/adminRoutes.js');
const orderRoutes =     require('./routes/orderRoutes.js');
const locationRoutes =  require('./routes/locationRoutes.js')
const storageRoutes =   require('./routes/storageRoutes.js')
const posRoutes =       require('./routes/posRoutes.js')
const itemRoutes =      require('./routes/itemRoutes.js');
const userRoutes =      require('./routes/userRoutes.js');
const vatRoutes =       require('./routes/vatRoutes.js');
const purchaseRoutes =  require('./routes/purchaseRoutes.js');


const app = express()   
app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));

app.use(cors());
db.sequelize.sync();

app.use('/auth',            authRoutes);
app.use('/admin',           authMiddleware.verifyJWT, adminRoutes);
app.use('/location',        authMiddleware.verifyJWT, locationRoutes);
app.use('/storage',         authMiddleware.verifyJWT, storageRoutes);
app.use('/pos',             authMiddleware.verifyJWT, posRoutes)
app.use('/item',            authMiddleware.verifyJWT, itemRoutes);
app.use('/orders',          authMiddleware.verifyJWT, orderRoutes);
app.use('/user',            authMiddleware.verifyJWT, userRoutes);
app.use('/vat',             authMiddleware.verifyJWT, vatRoutes);
app.use('/purchase-order',  authMiddleware.verifyJWT, purchaseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;