const Sequelize = require('sequelize')
const mysql2 = require('mysql2');
const sequelize = new Sequelize("db_aa6c5b_sipos","aa6c5b_sipos","sipostim56",{host:"MYSQL6008.site4now.net",dialect:"mysql",dialectModule:mysql2,logging:false});
const db={};
const path = require('path');

db.Sequelize = Sequelize;  
db.sequelize = sequelize;
db.user = require('../models/User.js')(sequelize,Sequelize);
db.item = require('../models/Item.js')(sequelize,Sequelize);    
db.orderItem = require('../models/OrderItem.js')(sequelize,Sequelize);
db.storage = require('../models/Storage.js')(sequelize,Sequelize);
db.order = require('../models/Order.js')(sequelize,Sequelize);
db.pos = require('../models/POS.js')(sequelize,Sequelize);
db.location = require('../models/Location.js')(sequelize,Sequelize);
db.storageItem = require('../models/StorageItem.js')(sequelize,Sequelize);
db.vat = require('../models/VAT.js')(sequelize,Sequelize);


db.location.hasOne(db.storage);
db.storage.belongsTo(db.location);

db.location.hasOne(db.storage);
db.storage.belongsTo(db.location);

db.item.belongsTo(db.location);
db.location.hasMany(db.item);   

db.item.belongsToMany(db.order,{through:db.orderItem});
db.order.belongsToMany(db.item,{through:db.orderItem});

db.item.belongsToMany(db.storage,{through:db.storageItem});
db.storage.belongsToMany(db.item,{through:db.storageItem});

db.location.hasMany(db.pos);
db.pos.belongsTo(db.location);

db.order.belongsTo(db.storage);
db.storage.hasMany(db.order);

module.exports = db;