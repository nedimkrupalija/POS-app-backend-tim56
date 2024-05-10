const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("POS", {
        name:   Sequelize.STRING,
        status: Sequelize.STRING
    });
