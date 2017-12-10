'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verify(tokenP, secretP) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.verify(tokenP, secretP, function (err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });
} // Try to do this with bluebird instead and maybe add a regex for removing the Async sufix provided by bluebird
// JWT wrapper to use with promises


function sign(payloadP, secretP, jwtDataP) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.sign(payloadP, secretP, jwtDataP, function (err, token) {
      if (err) reject(err);
      resolve(token);
    });
  });
}

exports.default = { verify: verify, sign: sign };