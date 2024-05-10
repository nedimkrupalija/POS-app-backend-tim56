const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("orderitem", {
        quantity:   Sequelize.FLOAT,
    });
