const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("vat", {
        name:       Sequelize.STRING,
        percent:    Sequelize.FLOAT
    });
