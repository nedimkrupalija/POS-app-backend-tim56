const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const Storage = sequelize.define("Storage", {
        status:Sequelize.STRING,
    });

    return Storage;
};