const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const VAT = sequelize.define("VAT", {
        name : Sequelize.STRING,
        percent : Sequelize.FLOAT
    });

    return VAT;
};
