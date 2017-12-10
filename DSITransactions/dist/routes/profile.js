'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _profile = require('../controllers/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(_profile2.default.create).get(_profile2.default.list).put(_profile2.default.massUpdate);

router.route('/:profId').put(_profile2.default.update);

exports.default = router;