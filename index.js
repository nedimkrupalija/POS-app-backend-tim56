const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const db = require('./config/db.js');
const authMiddleware = require('./middleware/auth.middleware.js');



const app = express()   

const PORT =  3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/test', authMiddleware, (req, res) => {
  res.status(200).json('Hello World!')
}) 

module.exports = app;