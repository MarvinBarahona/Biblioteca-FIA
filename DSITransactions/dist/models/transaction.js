'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelTransaction(sequelize, DataTypes) {

  //Defining the model
  var Transaction = sequelize.define('Transaction', {
    notes: { type: DataTypes.STRING, allowNull: true },
    single: { type: DataTypes.BOOLEAN, defaultValue: true },
    type: { type: DataTypes.STRING },
    userName: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.JSONB, allowNull: true }
  }, { freezeTableName: true });

  //Static methods
  Transaction.beforeSave(function (transaction) {
    //Must return a promise
  });

  //Instance methods
  Transaction.prototype.getType = function () {
    return this['get' + this.get('transactable').substr(0, 1).toUpperCase() + this.get('transactable').substr(1)]();
  };
  //The save methods for associations will be added to the prototype

  //Associations
  //Local associations with sequelize models
  Transaction.associate = function (models) {

    Transaction.belongsToMany(models.Copy, {
      through: models.CopiesTransactions,
      as: 'copies'
    });

    Transaction.belongsToMany(models.Profile, {
      through: models.ProfilesTransactions,
      as: 'users'
    });

    Transaction.hasOne(models.Transaction, { as: 'Related' });
  };

  return Transaction;
}

exports.default = modelTransaction;