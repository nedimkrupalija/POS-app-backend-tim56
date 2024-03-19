const Sequelize = require('sequelize')
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};
const path = require('path');

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


module.exports = db;