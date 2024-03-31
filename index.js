const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const db = require('./config/db.js');

const cors = require('cors');
const PORT = process.env.PORT || 3000



const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware.js');
const locationRoutes = require('./routes/locationRoutes.js')
const storageRoutes = require('./routes/storageRoutes.js')
const posRoutes = require('./routes/posRoutes.js')


const app = express()   
app.use(bodyParser.json());

app.use(cors());
db.sequelize.sync();

app.use('/auth', authRoutes);
app.use('/location',locationRoutes);
app.use('/storage',storageRoutes);
app.use('/pos',posRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app;