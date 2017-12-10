'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelMajor(sequelize, DataTypes) {

  //Defining the model
  var Major = sequelize.define('Major', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    code: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, { freezeTableName: true });

  //Static methods

  //Instance methods


  //Associations
  Major.associate = function (models) {
    Major.hasMany(models.Course, { as: 'courses' });
  };

  return Major;
}

exports.default = modelMajor;