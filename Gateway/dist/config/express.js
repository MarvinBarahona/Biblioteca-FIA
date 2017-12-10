'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressPinoLogger = require('express-pino-logger');

var _expressPinoLogger2 = _interopRequireDefault(_expressPinoLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _expressPinoLogger2.default)());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(_bodyParser2.default.json({ limit: '5mb' }));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _routes2.default);

app.use(function (err, req, res, next) {
  req.log.error(err.message);
  var status = err.statusCode || 400;
  res.status(status).json({ message: err.message, errors: err.error });
  // switch(err.constructor){
  //   case expressValidation.ValidationError:
  //     res.status(500).json(err);
  //     break
  //
  //   case Sequelize.ValidationError:
  //       res.status(422).json(err.errors)
  //       break
  //
  //   default:
  //     res.status(500).json({status: err.status, message: err.message, errors: err.errors});
  // }
});

exports.default = app;