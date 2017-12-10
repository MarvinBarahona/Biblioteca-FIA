'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var mailer = _nodemailer2.default.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

function sendMail(mailOptions) {
  return new Promise(function (resolve, reject) {
    mailer.sendMail(mailOptions, function (err, info) {
      if (err) reject(err);
      resolve(info);
    });
  });
}

exports.default = { sendMail: sendMail };