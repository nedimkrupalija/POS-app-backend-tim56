const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const PurchaseItem = sequelize.define("PurchaseItem",{
        quantity:Sequelize.FLOAT,
    })
    return PurchaseItem;
};