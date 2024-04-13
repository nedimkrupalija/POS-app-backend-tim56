const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("StorageItem", {
        quantity:   Sequelize.FLOAT,
    });
