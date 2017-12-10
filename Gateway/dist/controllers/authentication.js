'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwt = require('../config/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _googleAuth = require('../config/googleAuth');

var _googleAuth2 = _interopRequireDefault(_googleAuth);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticate(request, response, next) {
  var email = request.body.email;
  var password = request.body.password;

  var options = {
    method: 'POST',
    uri: process.env.USERS_HOST + 'users/checkPass',
    body: { email: email, password: password },
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    request.user = rep;
    next();
  }).catch(next);
} // import dotenv from 'dotenv'
// dotenv.config()


function generateToken(request, response, next) {
  var secret = process.env.JWT_SECRET;
  var expireTime = process.env.JWT_EXPIRATION;
  var payload = { id: request.user.id, email: request.user.email, fullname: request.user.fullname, Group: request.user.Group, Policies: request.user.Policies };
  var jwtData = { expiresIn: expireTime
    //Creating the token
  };_jwt2.default.sign(payload, secret, jwtData).then(function (token) {
    response.status(200).json({ token: token, user: request.user });
  }).catch(next);
}

function checkToken(request, response, next) {
  var token = request.params.token || request.get('Authorization');
  var secret = process.env.JWT_SECRET;
  if (!token || token === 'null') return response.status(401).json({ error: 'No token' });else {
    _jwt2.default.verify(token, secret).then(function (decoded) {
      request.user = { id: decoded.id, email: decoded.email, fullname: decoded.fullname, Group: decoded.Group, Policies: decoded.Policies };
      next();
    }).catch(next);
  }
}

function showDecodedToken(request, response) {
  var body = request.user;
  response.status(200).json(body);
}

function changePassword(request, response, next) {
  var options = {
    method: 'POST',
    uri: process.env.USERS_HOST + 'auth/change_password',
    body: request.body,
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json({ message: 'Password changed succesfully' });
  }).catch(next);
}

function requestPass(request, response, next) {
  var email = request.body.email;
  var options = {
    method: 'POST',
    uri: process.env.USERS_HOST + 'auth/request_password',
    body: { email: email },
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json({ message: 'Check your email' });
  }).catch(next);
}

function verifyGoogle(request, response, next) {
  var gToken = request.body.token;
  if (!gToken || gToken === '') return response.status(401).json({ error: 'No token' });

  _googleAuth2.default.verifyIdToken(gToken).then(function (payload) {
    // Check for the existence of a payload['hd'], it has to be in every UES account

    if (process.env.UESCHECK) if (!payload['hd'] || payload['hd'] != 'ues.edu.sv') return response.status(401).json({ message: 'Not a UES member' });
    var body = { email: payload['email'], fullname: payload['name'] };

    if (body.email.split('@')[0].length == 7) body.group = 'Estudiante';else body.group = 'Docente';
    return (0, _requestPromiseNative2.default)({ method: 'POST', uri: process.env.USERS_HOST + 'auth/create_account', body: body, json: true }).then(function (rep) {
      request.user = rep.user;
      if (!rep.new) return next();

      var info = { userId: rep.user.id, userName: rep.user.fullname, email: rep.user.email };
      console.log(info);
      var options = { method: 'POST', uri: process.env.TRANS_HOST + 'profiles/', json: true, body: info };

      return (0, _requestPromiseNative2.default)(options).then(function (values) {
        next();
      });
    });
  }).catch(next);
}

exports.default = { authenticate: authenticate, generateToken: generateToken, checkToken: checkToken, showDecodedToken: showDecodedToken, changePassword: changePassword, requestPass: requestPass, verifyGoogle: verifyGoogle };