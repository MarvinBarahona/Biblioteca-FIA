'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _suggestion = require('../controllers/suggestion');

var _suggestion2 = _interopRequireDefault(_suggestion);

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _permission = require('../controllers/permission');

var _permission2 = _interopRequireDefault(_permission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_authentication2.default.checkToken);

router.route('/').get(_permission2.default.validateSuggestions, _suggestion2.default.list);

router.route('/periods').post(_permission2.default.validateSuggestions, _suggestion2.default.changePeriod);

router.route('/careers').get(_permission2.default.validateSuggestions, _suggestion2.default.listMajors);

router.route('/user/:userId').get(_permission2.default.validateSuggestions, _suggestion2.default.history);

router.route('/teacher').post(_permission2.default.validateTeacher, _suggestion2.default.create);

router.route('/student').post(_permission2.default.validateStudent, _suggestion2.default.create);

router.route('/:suggId/votes').post(_permission2.default.validateStudent, _suggestion2.default.upvote);

router.route('/:suggId/orders').post(_permission2.default.validateTeacher, _suggestion2.default.order);

router.route('/:suggId').get(_permission2.default.validateSuggestions, _suggestion2.default.get).put(_permission2.default.validateSuggestions, _suggestion2.default.update);

exports.default = router;