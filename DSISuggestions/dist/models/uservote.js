'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelUservote(sequelize, DataTypes) {

  //Defining the model
  var Uservote = sequelize.define('Uservote', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: false },
    priority: { type: DataTypes.BOOLEAN, defaultValue: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    action: { type: DataTypes.ENUM('Creation', 'Order', 'Vote', 'Added'), allowNull: false }
  }, { freezeTableName: true, indexes: [{ unique: true, fields: ['userId', 'ProposalId'] }] });

  //Static methods

  //Instance methods


  //Associations


  Uservote.associate = function (models) {
    Uservote.hasOne(models.Order, { as: 'order' });
  };

  return Uservote;
}

exports.default = modelUservote;