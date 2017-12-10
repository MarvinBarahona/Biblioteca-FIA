'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwt = require('../config/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _mailer = require('../config/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Importing the models index
// import jwt from 'jsonwebtoken'
var User = _models2.default.User;
var Group = _models2.default.Group;


function authenticate(request, response, next) {
  User.findOne({ where: { email: request.body.email }, include: [{ association: 'Group', include: ['Policies'] }, 'Policies'] }).then(function (user) {
    if (!user) return response.status(404).json({ message: 'User not found' });
    return user.checkPassword(request.body.password).then(function (isMatch) {
      if (isMatch) {
        //Destructuring property could be applied of the object was more complex
        //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        // request.user = (({id, email})=>({id, email}))(user)
        //Change this for something better with object literals
        request.user = user.parseUser();
        next();
      } else return response.status(401).json({ message: 'Incorrect password' });
    });
  }).catch(next);
}

//With promises
function generateToken(request, response, next) {
  var secret = process.env.JWT_SECRET;
  var expireTime = process.env.JWT_EXPIRATION;
  var payload = { user_id: request.user.id, user_email: request.user.email };
  var jwtData = { expiresIn: expireTime
    //Creating the token
  };_jwt2.default.sign(payload, secret, jwtData).then(function (token) {
    response.status(200).json({ token: token, user: request.user });
  }).catch(next);
}

//With promises
function checkToken(request, response, next) {
  var token = request.params.token || request.get('Authorization');
  var secret = process.env.JWT_SECRET;
  if (!token || token === 'null') return response.status(401).json({ error: 'No token' });else {
    _jwt2.default.verify(token, secret).then(function (decoded) {
      return User.findOne({ where: { id: decoded.user_id }, include: [{ association: 'Group', include: ['Policies'] }, 'Policies'] }).then(function (user) {
        if (!user) response.status(404).json({ error: 'Account does not longer exists' });
        if (decoded.user_email === user.email) {
          request.user = user.parseUser();
          next();
        } else {
          response.status(401).json({ status: 'Email changed, request new token this one must be deleted' });
        }
      });
    }).catch(next);
  }
}

function showDecodedToken(request, response) {
  var body = request.user;
  response.status(200).json(body);
}

//With promises
function changePassword(request, response, next) {
  var token = request.body.token;
  var userId = request.body.userId;

  User.findById(userId).then(function (body) {
    if (!body) return response.status(404).json({ error: 'User does not longer exist' });
    return _jwt2.default.verify(token, body.password).then(function (decoded) {
      var newPassword = request.body.password;
      body.password = newPassword;
      return body.save();
    }).then(function () {
      response.status(200).json({ message: 'Updated password' });
    });
  }).catch(next);
}

//With promises
function requestPassChange(request, response, next) {
  //Current user is in request.user so just send the email with that data
  var userEmail = request.body.email;
  User.findOne({ where: { email: userEmail } }).then(function (userFound) {
    if (!userFound) return response.status(404).json({ error: 'No user with that email' });
    var userSecret = userFound.password;
    return _jwt2.default.sign({ user_email: userEmail }, userSecret).then(function (token) {
      var mailOptions = {
        from: process.env.GMAIL_USER,
        to: userEmail,
        subject: 'Cambia tu contraseña',
        html: '<h1>Cambia tu contraseña haciendo click en el link abajo: </h1> <h2>' + process.env.FRONT_HOST + userFound.id + '/' + token + '</h2>'
      };

      return _mailer2.default.sendMail(mailOptions);
    }).then(function (info) {
      //The mail was sent
      response.status(200).json({ message: 'Email sent' });
    });
  }).catch(next);
}

function externalAccount(request, response, next) {
  User.findOrCreate({ where: { email: request.body.email }, defaults: { fullname: request.body.fullname, password: 'Not saved' }, include: [{ association: 'Group', include: ['Policies'] }] }).spread(function (user, created) {
    if (!created) return response.status(200).json({ user: user.parseUser(), new: false });
    return Group.findOne({ where: { name: request.body.group }, include: ['Policies'] }).then(function (group) {
      return user.setGroup(group.id).then(function (user) {
        user.Group = group;
        response.status(201).json({ user: user.parseUser(), new: true });
      });
    });
  }).catch(next);
}

exports.default = { authenticate: authenticate, generateToken: generateToken, checkToken: checkToken, changePassword: changePassword, requestPassChange: requestPassChange, showDecodedToken: showDecodedToken, externalAccount: externalAccount };