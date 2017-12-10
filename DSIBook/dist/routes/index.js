'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _author = require('./author');

var _author2 = _interopRequireDefault(_author);

var _subject = require('./subject');

var _subject2 = _interopRequireDefault(_subject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
//We separate the routes in different files if we want to, in this case it may be overkill because its only 2 controllers


router.get('/', function (request, response) {
  response.status(200).json({ status: 'Home' });
});

router.use('/books', _book2.default);
router.use('/subjects', _subject2.default);
router.use('/authors', _author2.default);

exports.default = router;