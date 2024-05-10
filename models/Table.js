const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Table", {
        name:   Sequelize.STRING
    });
