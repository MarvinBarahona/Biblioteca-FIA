'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _suggestions = require('./suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

var _major = require('./major');

var _major2 = _interopRequireDefault(_major);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (request, response) {
  response.status(200).json({ status: 'Home' });
});

router.use('/suggestions', _suggestions2.default);
router.use('/majors', _major2.default);

exports.default = router;