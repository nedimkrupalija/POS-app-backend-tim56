const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Purchase = sequelize.define("Purchase",{
        items:Sequelize.JSON,
        tableId:Sequelize.INTEGER,
        totals:Sequelize.INTEGER,
        vat:Sequelize.FLOAT,
        grandTotal:Sequelize.FLOAT
    })
    return Purchase;
}