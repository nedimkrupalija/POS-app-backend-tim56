const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("storageitem", {
        quantity:   Sequelize.FLOAT,
    });
