const Sequelize = require('sequelize')
const mysql2 = require('mysql2');
const sequelize = new Sequelize("db_aa6c5b_sipos","aa6c5b_sipos","sipostim56",{host:"MYSQL6008.site4now.net",dialect:"mysql",dialectModule:mysql2,logging:false});
const db={};
const path = require('path');

db.Sequelize = Sequelize;  
db.sequelize = sequelize;
db.user = require('../models/User.js')(sequelize,Sequelize);

module.exports = db;