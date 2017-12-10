'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();


_express2.default.listen(process.env.PORT, function () {
  _models2.default.sequelize.sync({ force: false }).then(function () {}).catch(function (err) {});
});

exports.default = _express2.default;