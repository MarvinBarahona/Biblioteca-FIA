'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _book = require('../controllers/book');

var _book2 = _interopRequireDefault(_book);

var _cataloging = require('../controllers/cataloging');

var _cataloging2 = _interopRequireDefault(_cataloging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_book2.default.list).post(_book2.default.create);

router.route('/minimal/:minId').get(_book2.default.getMinimal);

// TODO: Add a method that saves the image to AWS and passes it as request.awsimage
router.route('/:bookId/setCataloging').post(_cataloging2.default.uploadImg, _cataloging2.default.setCataloging);

router.route('/:bookId/finishCataloging').post(_cataloging2.default.finishCat);

router.route('/:bookId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
.get(_book2.default.get).delete(_book2.default.destroy);

router.param('bookId', _book2.default.load);

exports.default = router;