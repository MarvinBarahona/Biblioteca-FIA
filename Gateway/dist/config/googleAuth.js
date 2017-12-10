'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleAuthLibrary = require('google-auth-library');

var _googleAuthLibrary2 = _interopRequireDefault(_googleAuthLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = new _googleAuthLibrary2.default();

//TO DO: Check if dotenv is working in here

//A wrapper for google authentication service, so the code remains consistent and we are able to chain the promises to do further work

var client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, '', '');

function verifyIdToken(tokenPassed) {
  return new Promise(function (resolve, reject) {
    client.verifyIdToken(tokenPassed, process.env.GOOGLE_CLIENT_ID, function (e, login) {
      if (e) return reject(e);
      var payload = login.getPayload();
      resolve(payload);
    });
  });
}

exports.default = { verifyIdToken: verifyIdToken };