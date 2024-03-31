const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const User = sequelize.define("User",{
        username:Sequelize.STRING,
        phoneNumber:Sequelize.STRING,
        password:Sequelize.STRING,
        role:Sequelize.STRING
    })
    return User;
};