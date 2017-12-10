'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _policy = require('../controllers/policy');

var _policy2 = _interopRequireDefault(_policy);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// router.use(authController.checkToken, authController.validateManagement) //Validating the roles

router.route('/') //Remember, this points to /apiauth/policys/
.get(_policy2.default.list).post(_policy2.default.create);

router.route('/:policyId') //points to /apiauth/policys/:policyId
.get(_policy2.default.get).put(_policy2.default.update).delete(_policy2.default.destroy);

router.param('policyId', _policy2.default.load);

exports.default = router;