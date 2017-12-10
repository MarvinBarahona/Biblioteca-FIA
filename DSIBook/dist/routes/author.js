'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _author = require('../controllers/author');

var _author2 = _interopRequireDefault(_author);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// router.route('/')
// .get(authorController.list)
// .post(authorController.create)

router.route('/authorPub/').get(_author2.default.getAuthoPub);

// router.route('/:authorId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
// .get(authorController.get)
// .put(authorController.update)
// .delete(authorController.destroy)
//
// router.param('authorId', authorController.load)

exports.default = router;