const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const db = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');




const app = express()   

const PORT =  3000

db.sequelize.sync({force: true});

app.use('/login', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/test', (req, res) => {
  res.status(200).json('Hello World!')
})

module.exports = app;