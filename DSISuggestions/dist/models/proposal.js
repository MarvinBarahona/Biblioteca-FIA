'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelProposal(sequelize, DataTypes) {

  //Defining the model
  var Proposal = sequelize.define('Proposal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    upvotes: { type: DataTypes.INTEGER, defaultValue: 0 },
    orders: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { freezeTableName: true });

  //Static methods

  //Instance methods


  //Associations


  Proposal.associate = function (models) {
    Proposal.hasMany(models.Uservote);
    Proposal.belongsTo(models.Suggestion);
    Proposal.belongsTo(models.Course);
  };

  return Proposal;
}

exports.default = modelProposal;