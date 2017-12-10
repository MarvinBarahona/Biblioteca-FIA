'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mailer = require('../config/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _jwt = require('../config/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //import the needed models


//Importing the models index
var User = _models2.default.User;


function list(request, response, next) {
  var query = request.query.all;
  var emptyQuery = !Object.keys(request.query).length;
  var groupFilter = emptyQuery ? _defineProperty({}, _models2.default.Sequelize.Op.or, [{ id: 1 }, { id: 2 }, { id: 4 }]) : {};

  User.findAll({ attributes: ['id', 'email', 'fullname'], include: [{ association: 'Group', attributes: ['name'], where: groupFilter }] }).then(function (users) {
    response.status(200).json(users);
  }).catch(next);
}

function create(request, response, next) {
  //We'll implement bcrypt in the usermodel
  var password = _crypto2.default.randomBytes(64).toString('hex');
  User.create({
    email: request.body.email,
    password: password,
    fullname: request.body.fullname
  }).then(function (saved) {
    //Generate a jwt and send it in a token
    return _jwt2.default.sign({ user_id: saved.id, user_email: saved.email }, saved.password).then(function (token) {
      var mailOptions = {
        from: process.env.GMAIL_USER,
        to: saved.email,
        subject: 'Establece una contraseña', //Maybe import this configuration from enviroment or file provided by the enviroment
        html: '<h1>Cambia tu contraseña haciendo click en el link abajo: </h1> <h2>' + process.env.FRONT_HOST + saved.id + '/' + token + '</h2>' //Importing the html migth also work
      };
      return Promise.all([_mailer2.default.sendMail(mailOptions), saved.setGroup(request.body.group)]);
    }).then(function (info) {
      response.status(201).json({ message: 'Verification email sent', user: saved });
    });
  }).catch(next);
}

function load(request, response, next, id) {
  // Validation of the integer with a regex
  if (/([^0-9])+/g.test(id)) return response.status(422).json({ error: 'Invalid user id' });
  User.findOne({ where: { id: id }, include: [{ association: 'Group', include: ['Policies'] }, 'Policies'] }).then(function (user) {
    if (user) {
      request.userQueried = user;
      next();
    } else {
      response.status(400).json({ message: 'User not found' });
    }
  }).catch(next);
}

//If an error ocurrs in any of the functions we can define a next parameter, which represents the middleware that will handle this errors
//We'll ignore that for now so we'll just use request and response
function get(request, response) {
  var userToShow = request.userQueried.detailPolicies();
  response.status(200).json(userToShow);
}

function update(request, response, next) {
  var user = request.userQueried;
  Object.assign(user, request.body); //Nice function to just replace the properties of the object listed, just send the email on the body and it will change
  user.save().then(function () {
    response.status(200).json({ message: 'Updated' });
  }).catch(next);
}

function destroy(request, response, next) {
  var user = request.userQueried;
  user.destroy().then(function () {
    response.status(200).json({ message: 'Deleted' });
  }).catch(next);
}

function addToGroup(request, response, next) {
  var user = request.userQueried;
  user.setGroup(request.params.groupId).then(function () {
    response.status(201).json({ message: 'User added to group' });
  }).catch(next);
}

function removeFromGroup(request, response, next) {
  var user = request.userQueried;
  user.setGroup(null).then(function () {
    //There must be a better way but the documentation sucks
    response.status(201).json({ message: 'User removed from group' });
  }).catch(next);
}

// function addPolicies(request, response, next) {
//   const policies = request.body.policies
//   //Creating the array of promises
//   //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//   const promises = policies.map(pol => request.userQueried.addPolicy(pol))
//
//   //Executing all promises in parallel so theres no I/O block and resolves when all promises in the array resolves
//   //See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
//   Promise.all(promises).then(values=>{
//     response.status(201).json({message: 'Policies added'})
//   }).catch(next)
//
// }
//
// function removePolicies(request, response, next) {
//   const policies = request.body.policies
//   //Creating the array of promises
//   //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//   const promises = policies.map(pol => request.userQueried.removePolicy(pol))
//   //Executing all promises in parallel so theres no I/O block and resolves when all promises in the array resolves
//   //See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
//   Promise.all(promises).then(values=>{
//     response.status(201).json({message: 'Policies removed'})
//   }).catch(next)
//
// }

function setPolicies(request, response, next) {
  var policies = request.body.policies;
  // Validate existing ones
  var gPol = request.userQueried.Group.Policies.map(function (p) {
    return p.id;
  });

  var pol = policies.filter(function (p) {
    return !gPol.includes(p);
  });

  request.userQueried.setPolicies(pol).then(function () {
    response.status(201).json({ message: 'Policies set' });
  }).catch(next);
}

function validateIdentity(request, response, next) {
  if (request.user.email === request.userQueried.email) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to change this user' });
  }
}

function checkPass(request, response, next) {
  User.findOne({ where: { email: request.body.email }, include: [{ association: 'Group', include: ['Policies'] }, 'Policies'] }).then(function (user) {
    if (!user) return response.status(404).json({ message: 'User not found' });
    return user.checkPassword(request.body.password).then(function (isMatch) {
      if (isMatch) {
        response.status(200).json(user.parseUser());
      } else return response.status(401).json({ message: 'Incorrect password' });
    });
  }).catch(next);
}

exports.default = { list: list, create: create, load: load, get: get, update: update, destroy: destroy, addToGroup: addToGroup, removeFromGroup: removeFromGroup, setPolicies: setPolicies, validateIdentity: validateIdentity, checkPass: checkPass };