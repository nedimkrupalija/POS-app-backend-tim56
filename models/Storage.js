const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Storage = sequelize.define("Storage",{
        status:Sequelize.STRING,
       
    })
    return Storage;
};