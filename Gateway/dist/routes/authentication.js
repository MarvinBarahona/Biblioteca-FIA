'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/login').post(_authentication2.default.authenticate, _authentication2.default.generateToken);

router.route('/verifyGoogle').post(_authentication2.default.verifyGoogle, _authentication2.default.generateToken);

router.route('/verify/:token').get(_authentication2.default.checkToken, _authentication2.default.showDecodedToken);

// router.route('/change_password/:userId/:token')
// .post(authController.changePassword)
//
// router.route('/newpassword')
// .post(authController.requestPass)

exports.default = router;