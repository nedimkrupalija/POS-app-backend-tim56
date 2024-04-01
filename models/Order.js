const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Order = sequelize.define("Order",{
        status:Sequelize.STRING,
        date:Sequelize.DATE,
    })
    return Order;
};