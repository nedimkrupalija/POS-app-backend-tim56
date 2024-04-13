const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const StorageItem = sequelize.define("StorageItem", {
        quantity:Sequelize.FLOAT, 
    });

    return StorageItem;
};