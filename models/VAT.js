const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("VAT", {
        name:       Sequelize.STRING,
        percent:    Sequelize.FLOAT
    });
