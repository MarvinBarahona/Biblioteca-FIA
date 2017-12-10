'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelStock(sequelize, DataTypes) {

  //Defining the model
  var Stock = sequelize.define('Stock', {
    lastUpdated: { type: DataTypes.DATE, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    quantityAvailable: { type: DataTypes.INTEGER }
  }, { freezeTableName: true });

  //Static methods
  Stock.beforeSave(function (stock) {});

  //Instance methods
  //In case of association modification
  //save modifications will have to be manually done too
  //Destroy methods too

  //Associations
  //We can define the sequelize associations within a database, here we will
  //also define the virtual associations with rest facade
  //Associations with another api and we will manually write the get, set, and remove
  Stock.associate = function (models) {
    Stock.belongsTo(models.Book);
  };

  return Stock;
}

exports.default = modelStock;