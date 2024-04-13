const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define("Table", {
        name:Sequelize.STRING
    });

    return Table;
};