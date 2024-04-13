const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("PurchaseItem", {
        quantity:   Sequelize.FLOAT,
    });
