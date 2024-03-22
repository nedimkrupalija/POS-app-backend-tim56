const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const db = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth.middleware.js');

const app = express()   
app.use(bodyParser.json());
const PORT =  3000

db.sequelize.sync();

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app;