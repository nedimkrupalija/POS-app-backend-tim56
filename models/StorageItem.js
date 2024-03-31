const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const StorageItem = sequelize.define("StorageItem",{
        quantity:Sequelize.FLOAT, 
    })
    return StorageItem;
};