'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelBookS(sequelize, DataTypes) {

  var BookSubjects = sequelize.define('BookSubjects', {
    //No attributes
  });

  //Static methods


  //Instance methods

  //Associations

  return BookSubjects;
}

exports.default = modelBookS;