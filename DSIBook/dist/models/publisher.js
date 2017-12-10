'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelPublisher(sequelize, DataTypes) {

  //Defining the model
  var Publisher = sequelize.define('Publisher', {
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    info: { type: DataTypes.STRING, allowNull: true },
    contact: { type: DataTypes.STRING, allowNull: true }
  }, { freezeTableName: true });

  //Static methods
  Publisher.beforeSave(function (publisher) {});

  //Instance methods
  //In case of association modification
  //save modifications will have to be manually done too
  //Destroy methods too

  //Associations
  //We can define the sequelize associations within a database, here we will
  //also define the virtual associations with rest facade
  //Associations with another api and we will manually write the get, set, and remove


  Publisher.associate = function (models) {
    Publisher.hasMany(models.Book);
  };

  return Publisher;
}

exports.default = modelPublisher;