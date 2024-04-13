const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("Item", {
        name: Sequelize.STRING,
        barCode: Sequelize.STRING,
        measurmentUnit: Sequelize.STRING,
        purchasePrice: Sequelize.FLOAT,
        sellingPrice: Sequelize.FLOAT,
    });
    
    return Item;
};
