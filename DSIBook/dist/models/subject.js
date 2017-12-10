'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelSubject(sequelize, DataTypes) {

  //Defining the model
  var Subject = sequelize.define('Subject', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: true, unique: true }
  }, { freezeTableName: true });

  //Static methods
  Subject.beforeSave(function (subject) {});

  //Instance methods
  //In case of association modification
  //save modifications will have to be manually done too
  //Destroy methods too

  //Associations
  //We can define the sequelize associations within a database, here we will
  //also define the virtual associations with rest facade
  //Associations with another api and we will manually write the get, set, and remove
  Subject.associate = function (models) {
    Subject.belongsToMany(models.Book, {
      through: models.BookSubjects
    });
  };

  return Subject;
}

exports.default = modelSubject;