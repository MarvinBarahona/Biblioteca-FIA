'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjsThen = require('bcryptjs-then');

var _bcryptjsThen2 = _interopRequireDefault(_bcryptjsThen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function modelUser(sequelize, DataTypes) {

  //Defining the model
  var User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false }
  }, { freezeTableName: true, paranoid: true });

  //Static methods
  User.beforeSave(function (user) {
    return _bcryptjsThen2.default.hash(user.password, 10).then(function (hash) {
      user.password = hash;
    });
  });

  //Instance methods
  User.prototype.checkPassword = function (toCompare) {
    return _bcryptjsThen2.default.compare(toCompare, this.password);
  };

  User.prototype.parseUser = function () {
    var userParsed = { id: this.id, email: this.email, fullname: this.fullname };
    var groupPol = [];
    var userPol = [];
    if (this.Group) {
      userParsed.Group = this.Group.name;
      groupPol = this.Group.Policies.map(function (pol) {
        return pol.code;
      });
    } else userParsed.Group = 'None';

    if (this.Policies) userPol = this.Policies.map(function (pol) {
      return pol.code;
    });

    userParsed.Policies = groupPol.concat(userPol);

    return userParsed;
  };

  User.prototype.detailPolicies = function () {
    var userParsed = { id: this.id, email: this.email, fullname: this.fullname };
    var groupPol = [];
    var userPol = [];
    if (this.Group) {
      userParsed.Group = this.Group.name;
      groupPol = this.Group.Policies.map(function (pol) {
        return pol.code;
      });
    } else userParsed.Group = 'None';

    if (this.Policies) userPol = this.Policies.map(function (pol) {
      return pol.code;
    });

    userParsed.groupPol = groupPol;
    userParsed.addedPol = userPol;

    return userParsed;
  };

  //Associations
  User.associate = function (models) {
    User.belongsToMany(models.Policy, {
      through: models.UserPolicies
    });
    User.belongsTo(models.Group);
  };

  return User;
}

exports.default = modelUser;