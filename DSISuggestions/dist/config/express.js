'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _expressPinoLogger = require('express-pino-logger');

var _expressPinoLogger2 = _interopRequireDefault(_expressPinoLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = require('express-validator');

var app = (0, _express2.default)();
app.use((0, _expressPinoLogger2.default)());
// CORS Options
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

//Validate here the token, and if the request is different than GET /books
// or GET /books/:bookId check the group to match CATALOGUER OR boss
// Possibly check other neccesary politics, but the groups should be enough to get through

app.use(_bodyParser2.default.json()); //For receiving images
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(validator());

app.use('/', _routes2.default);

//Define the validation middleware in different fles or in this

//Handle all error types
app.use(function (err, req, res, next) {
    req.log.error(err.message);
    switch (err.constructor) {

        case _sequelize2.default.ValidationError:
            res.status(422).json({ errors: err.errors });
            break;

        case _sequelize2.default.UniqueConstraintError:
            // Extract the id of the existing one
            res.status(422).json({ errors: err.errors });
            break;

        case _sequelize2.default.DatabaseError:
            res.status(422).json({ errors: err.errors });
            break;

        default:
            var status = err.status || 500;
            res.status(status).json({ message: err.message, errors: err.errors });
    }
});

exports.default = app;