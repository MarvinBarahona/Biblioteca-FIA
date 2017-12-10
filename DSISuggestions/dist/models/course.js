'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelCourse(sequelize, DataTypes) {

  //Defining the model
  var Course = sequelize.define('Course', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    code: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, { freezeTableName: true });

  //Static methods

  //Instance methods


  //Associations


  Course.associate = function (models) {

    Course.belongsToMany(models.Suggestion, {
      through: models.Proposal
    });
  };

  return Course;
}

exports.default = modelCourse;