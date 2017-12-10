'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _subject = require('../controllers/subject');

var _subject2 = _interopRequireDefault(_subject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_subject2.default.list).post(_subject2.default.create);

router.route('/:subjectId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
.get(_subject2.default.get);
// .put(subjectController.update)
// .delete(subjectController.destroy)

router.param('subjectId', _subject2.default.load);

exports.default = router;