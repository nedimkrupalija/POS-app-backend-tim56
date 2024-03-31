const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Location = sequelize.define("Location",{
        name:Sequelize.STRING,
        adress:Sequelize.STRING,
    })
    return Location;
};