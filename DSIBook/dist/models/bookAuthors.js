'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelBookA(sequelize, DataTypes) {

  var BookAuthors = sequelize.define('BookAuthors', {
    //No attributes on this join table
  });

  //Static methods and Hooks


  //Instance methods (prototype)

  //Associations


  return BookAuthors;
}

exports.default = modelBookA;