'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user3 = require('../validations/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/') //Remember, this points to /apiauth/users/
.get(_user2.default.list).post(_user4.default.newUser, _user2.default.create);

router.route('/checkPass').post(_user2.default.checkPass);

router.route('/:userId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
.get(_user2.default.get).put(_user2.default.update).delete(_user2.default.destroy);

router.route('/:userId/addGroup/:groupId').post(_user2.default.addToGroup);

router.route('/:userId/removeGroup/:groupId').delete(_user2.default.removeFromGroup);

// router.route('/:userId/addPolicies')
// .post(userController.addPolicies)
//
// router.route('/:userId/removePolicies')
// .delete(userController.removePolicies)

router.route('/:userId/setPolicies').post(_user2.default.setPolicies);

//Abstraction for the operations on a single user, this will request from the database the user required
//and pass it on to the other operation so we dont have to repeat our code on every Abstraction

router.param('userId', _user2.default.load);

exports.default = router;