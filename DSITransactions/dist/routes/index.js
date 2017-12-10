'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _copy = require('./copy');

var _copy2 = _interopRequireDefault(_copy);

var _transaction = require('./transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (request, response) {
  response.status(200).json({ status: 'Home route, dont panic' });
});

router.use('/copies', _copy2.default);
router.use('/transactions', _transaction2.default);
router.use('/profiles', _profile2.default);

exports.default = router;