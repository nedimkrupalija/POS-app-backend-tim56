const Sequelize = require('sequelize')
const mysql2 = require('mysql2');

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../constants.js');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS,
    { host: DB_HOST, dialect: "mysql", dialectModule: mysql2, logging: false }
);

const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.user =           require('../models/User.js')(sequelize,Sequelize);
db.item =           require('../models/Item.js')(sequelize,Sequelize);
db.orderItem =      require('../models/OrderItem.js')(sequelize,Sequelize);
db.storage =        require('../models/Storage.js')(sequelize,Sequelize);
db.order =          require('../models/Order.js')(sequelize,Sequelize);
db.pos =            require('../models/POS.js')(sequelize,Sequelize);
db.location =       require('../models/Location.js')(sequelize,Sequelize);
db.storageItem =    require('../models/StorageItem.js')(sequelize,Sequelize);
db.table =          require('../models/Table.js')(sequelize,Sequelize);
db.vat =            require('../models/VAT.js')(sequelize,Sequelize);
db.purchase =       require('../models/Purchase.js')(sequelize,Sequelize);
db.purchaseItem =   require('../models/PurchaseItem.js')(sequelize,Sequelize);

db.location.hasOne(db.storage);
db.storage.belongsTo(db.location);

db.item.belongsTo(db.vat);
db.vat.hasMany(db.item);

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

db.user.belongsTo(db.location);
db.location.hasMany(db.user);

db.table.belongsTo(db.user);
db.user.hasMany(db.table);

db.table.belongsTo(db.location);
db.location.hasMany(db.table);

db.purchase.belongsToMany(db.item, {through: db.purchaseItem});
db.item.belongsToMany(db.purchase,{through: db.purchaseItem});

module.exports = db;
