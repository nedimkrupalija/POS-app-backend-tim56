const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        quantity:Sequelize.FLOAT,
    });

    return OrderItem;
};