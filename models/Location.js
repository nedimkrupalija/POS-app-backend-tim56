const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Location", {
        name:   Sequelize.STRING,
        adress: Sequelize.STRING,
    });
