const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const VAT = sequelize.define("VAT",{
        name : Sequelize.STRING,
        percent : Sequelize.FLOAT
    })
    return VAT;
};