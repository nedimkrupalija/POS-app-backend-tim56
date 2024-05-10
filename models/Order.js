const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Order", {
        status: Sequelize.STRING,
        date:   Sequelize.DATE,
    });
