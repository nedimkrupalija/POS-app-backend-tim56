const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("purchaseitem", {
        quantity:   Sequelize.FLOAT,
    });
