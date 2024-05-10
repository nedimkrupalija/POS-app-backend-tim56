const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("item", {
        name:           Sequelize.STRING,
        barCode:        Sequelize.STRING,
        measurmentUnit: Sequelize.STRING,
        purchasePrice:  Sequelize.FLOAT,
        sellingPrice:   Sequelize.FLOAT,
    });
