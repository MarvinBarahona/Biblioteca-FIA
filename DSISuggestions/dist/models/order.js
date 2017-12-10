'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelOrder(sequelize, DataTypes) {

  //Defining the model
  var Order = sequelize.define('Order', {
    price: { type: DataTypes.REAL, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, { freezeTableName: true });

  //Static methods

  //Instance methods


  //Associations


  return Order;
}

exports.default = modelOrder;