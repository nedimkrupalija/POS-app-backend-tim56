const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const POS = sequelize.define("POS",{
        name:Sequelize.STRING,
        status:Sequelize.STRING
    })
    return POS;
};