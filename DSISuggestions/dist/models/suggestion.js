'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelSuggestion(sequelize, DataTypes) {

  //Defining the model
  var Suggestion = sequelize.define('Suggestion', {
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    edition: { type: DataTypes.DECIMAL, allowNull: false },
    publisher: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.NUMERIC(6, 2), defaultValue: '0.00' },
    upvotes: { type: DataTypes.INTEGER, defaultValue: 0 },
    orders: { type: DataTypes.INTEGER, defaultValue: 0 },
    quantity: { type: DataTypes.INTEGER },
    reason: { type: DataTypes.STRING },
    state: { type: DataTypes.ENUM('Aceptada', 'Pendiente', 'Rechazada'), defaultValue: 'Pendiente' }
  }, { freezeTableName: true });

  //Static methods
  //Instance methods
  Suggestion.prototype.formatCourses = function (votes) {
    var refSuggestion = Object.assign({}, this.dataValues);
    delete refSuggestion.Courses;
    var i = 0;
    var refCourses = this.Courses.map(function (c) {
      var rCourse = { id: c.id, name: c.name, upvotes: c.Proposal.upvotes, orders: c.Proposal.orders, votes: votes[i] };
      i++;
      return rCourse;
    });
    refSuggestion.Courses = refCourses;
    return refSuggestion;
  };

  //Associations
  Suggestion.associate = function (models) {
    Suggestion.belongsToMany(models.Course, {
      through: models.Proposal
    });
  };

  return Suggestion;
}

exports.default = modelSuggestion;