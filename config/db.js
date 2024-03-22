const Sequelize = require('sequelize')
const mysql2 = require('mysql2');
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",dialectModule:mysql2,logging:false});
const db={};
const path = require('path');

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


module.exports = db;