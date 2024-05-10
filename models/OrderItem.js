const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("OrderItem", {
        quantity:   Sequelize.FLOAT,
    });
