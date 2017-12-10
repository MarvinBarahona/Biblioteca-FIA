'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _major = require('../controllers/major');

var _major2 = _interopRequireDefault(_major);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_major2.default.list).post(_major2.default.massCreate);

exports.default = router;