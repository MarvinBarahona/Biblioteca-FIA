'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelProfile(sequelize, DataTypes) {

  var Profile = sequelize.define('Profile', {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoincrement: false },
    userName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    lastTransaction: { type: DataTypes.DATE },
    transactionsDone: { type: DataTypes.INTEGER, defaultValue: 0 },
    penalized: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { freezeTableName: true });

  Profile.beforeSave(function (Profile) {
    // Maybe validations or computed attributes
  });

  Profile.associate = function (models) {
    Profile.belongsToMany(models.Transaction, {
      through: models.ProfilesTransactions,
      as: 'transactions'
    });
  };

  return Profile;
}

exports.default = modelProfile;