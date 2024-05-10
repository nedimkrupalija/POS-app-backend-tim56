const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("table", {
        name:   Sequelize.STRING
    });
