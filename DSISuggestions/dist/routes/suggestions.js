'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _suggestion = require('../controllers/suggestion');

var _suggestion2 = _interopRequireDefault(_suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// import the controller(s)


router.route('/').get(_suggestion2.default.list);

router.route('/periods').delete(_suggestion2.default.deleteSuggestions);

router.route('/student').post(_suggestion2.default.getType, _suggestion2.default.createSuggestion);

router.route('/teacher').post(_suggestion2.default.getType, _suggestion2.default.createSuggestion);

router.route('/user/:userId').get(_suggestion2.default.getHistory);

router.route('/:suggId/upvote').post(_suggestion2.default.approvalType, _suggestion2.default.approve);

router.route('/:suggId/orders').post(_suggestion2.default.approvalType, _suggestion2.default.approve);

router.route('/:suggId').get(_suggestion2.default.get).put(_suggestion2.default.update);

router.param('suggId', _suggestion2.default.load);

exports.default = router;