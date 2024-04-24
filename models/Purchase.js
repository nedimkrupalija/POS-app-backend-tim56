const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Purchase", {
        items:      Sequelize.JSON,
        tableId:    Sequelize.INTEGER,
        totals:     Sequelize.INTEGER,
        vat:        Sequelize.FLOAT,
        grandTotal: Sequelize.FLOAT,
        status:     Sequelize.STRING,
    });
