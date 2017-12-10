'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelGroup(sequelize, DataTypes) {

  //Defining the model
  var Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, { freezeTableName: true });

  //Static methods


  //Instance methods

  //Associations
  Group.associate = function (models) {
    // Group.belongsToMany(models.User, {
    //   through: models.UserGroups
    // })
    Group.belongsToMany(models.Policy, {
      through: models.GroupPolicies
    });
    Group.hasMany(models.User);
  };

  return Group;
}

exports.default = modelGroup;