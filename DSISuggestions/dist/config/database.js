'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var configDB = {};

switch (process.env.NODE_ENV) {
  case 'development':
    configDB = process.env.DEV_DBURL;
    break;

  case 'production':
    configDB = process.env.PRO_DBURL;
    break;

  case 'test':
    configDB = process.env.TEST_DBURL;
    break;

}

exports.default = configDB;