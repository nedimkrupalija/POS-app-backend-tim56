const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("storage", {
        status: Sequelize.STRING,
    });
