'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _policy = require('./policy');

var _policy2 = _interopRequireDefault(_policy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//We separate the routes in different files if we want to, in this case it may be overkill because its only 2 controllers
var router = _express2.default.Router();

router.get('/', function (request, response) {
  response.status(200).json({ status: 'Home' });
});

router.use('/users', _user2.default);
router.use('/auth', _auth2.default);
router.use('/groups', _group2.default);
router.use('/policies', _policy2.default);

exports.default = router;