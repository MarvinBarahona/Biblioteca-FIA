'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelPolicy(sequelize, DataTypes) {

  //Defining the model
  var Policy = sequelize.define('Policy', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    code: { type: DataTypes.INTEGER, unique: true, allowNull: false }
  }, { freezeTableName: true });

  //Static methods


  //Instance methods

  //Associations
  Policy.associate = function (models) {
    Policy.belongsToMany(models.User, {
      through: models.UserPolicies
    });
    Policy.belongsToMany(models.Group, {
      through: models.GroupPolicies
    });
  };

  return Policy;
}

exports.default = modelPolicy;