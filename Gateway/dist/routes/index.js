'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('./authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _copy = require('./copy');

var _copy2 = _interopRequireDefault(_copy);

var _transaction = require('./transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _suggestion = require('./suggestion');

var _suggestion2 = _interopRequireDefault(_suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (request, response) {
  response.status(200).json({ message: 'Gateway home' });
});

router.use('/authentication', _authentication2.default);
router.use('/users', _user2.default);
router.use('/books', _book2.default);
router.use('/copies', _copy2.default);
router.use('/transactions', _transaction2.default);
router.use('/suggestions', _suggestion2.default);

exports.default = router;