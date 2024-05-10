const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("purchase", {
        totals:     Sequelize.INTEGER,
        vat:        Sequelize.FLOAT,
        grandTotal: Sequelize.FLOAT,
        status:     Sequelize.STRING,
    });
