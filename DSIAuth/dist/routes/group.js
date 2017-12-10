'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _group = require('../controllers/group');

var _group2 = _interopRequireDefault(_group);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// router.use(authController.checkToken, authController.validateManagement)

router.route('/') //Remember, this points to /apiauth/groups/
.get(_group2.default.list).post(_group2.default.create);

router.route('/:groupId') //points to /apiauth/groups/:groupId
.get(_group2.default.get).put(_group2.default.update).delete(_group2.default.destroy);

router.route('/:groupId/addPolicies').post(_group2.default.addPolicies);

router.route('/:groupId/removePolicies').delete(_group2.default.removePolicies);

router.param('groupId', _group2.default.load);

exports.default = router;