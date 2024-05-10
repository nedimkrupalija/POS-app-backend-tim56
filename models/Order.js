const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("order", {
        status: Sequelize.STRING,
        date:   Sequelize.DATE,
    });
