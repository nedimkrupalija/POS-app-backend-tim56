const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Storage", {
        status: Sequelize.STRING,
    });
