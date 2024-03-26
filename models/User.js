const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Korisnik = sequelize.define("User",{
        username:Sequelize.STRING,
        phoneNumber:Sequelize.STRING,
        password:Sequelize.STRING,
        role:Sequelize.STRING
    })
    return Korisnik;
};