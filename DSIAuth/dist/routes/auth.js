'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/authenticate').post(_auth2.default.authenticate, _auth2.default.generateToken);

// router.route('/verify/:token')
// .get(authController.checkToken, authController.showDecodedToken)

router.route('/change_password/').post(_auth2.default.changePassword);

router.route('/request_password').post(_auth2.default.requestPassChange);

router.route('/create_account').post(_auth2.default.externalAccount);

exports.default = router;