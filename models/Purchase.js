const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Purchase", {
        totals:     Sequelize.INTEGER,
        vat:        Sequelize.FLOAT,
        grandTotal: Sequelize.FLOAT,
        status:     Sequelize.STRING,
    });
