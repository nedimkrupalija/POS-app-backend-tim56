const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("pos", {
        name:   Sequelize.STRING,
        status: Sequelize.STRING
    });
