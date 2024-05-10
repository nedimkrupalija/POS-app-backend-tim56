const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("location", {
        name:   Sequelize.STRING,
        adress: Sequelize.STRING,
    });
