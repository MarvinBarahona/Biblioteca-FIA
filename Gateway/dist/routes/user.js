'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _permission = require('../controllers/permission');

var _permission2 = _interopRequireDefault(_permission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/recovery').post(_authentication2.default.requestPass);

router.route('/changePassword').post(_authentication2.default.changePassword);

router.use(_authentication2.default.checkToken, _permission2.default.validateManagement); //Check the token before running any of the following functions, since all of this operations require a token

router.route('/') //Remember, this points to /apiauth/users/
.get(_user2.default.list).post(_user2.default.create);

router.route('/groups').get(_user2.default.listGroups);

router.route('/:userId/setPolicies').post(_user2.default.setPolicies);

router.route('/:userId').get(_user2.default.get).put(_user2.default.update).delete(_user2.default.remove);
//
// router.route('/:userId/addGroup/:groupId')
// .post(userController.addToGroup)
//
// router.route('/:userId/removeGroup/:groupId')
// .delete(userController.removeFromGroup)
//
// router.route('/:userId/addPolicies')
// .post(userController.addPolicies)
//
// router.route('/:userId/removePolicies')
// .delete(userController.removePolicies)
//

exports.default = router;