const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Lokacija = sequelize.define("Location",{
        name:Sequelize.STRING,
        address:Sequelize.STRING,
        contactInfo:Sequelize.STRING,
        storage:Sequelize.INTEGER
    })
    return Lokacija;
};