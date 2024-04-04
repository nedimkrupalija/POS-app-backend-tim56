const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const OrderItem = sequelize.define("OrderItem",{
        quantity:Sequelize.FLOAT,
    })
    return OrderItem;
};