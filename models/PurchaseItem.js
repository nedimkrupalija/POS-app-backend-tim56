const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const PurchaseItem = sequelize.define("PurchaseItem", {
        quantity:Sequelize.FLOAT,
    });

    return PurchaseItem;
};