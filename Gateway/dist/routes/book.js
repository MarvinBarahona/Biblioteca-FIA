'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _permission = require('../controllers/permission');

var _permission2 = _interopRequireDefault(_permission);

var _book = require('../controllers/book');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/') //Remember, this points to /apiauth/books/
.post(_authentication2.default.checkToken, _permission2.default.validateTransactions, _book2.default.create);

router.route('/') //Remember, this points to /apiauth/books/
.get(_authentication2.default.checkToken, _permission2.default.validateGetBook, _book2.default.list);

// router.use(authController.checkToken, permController.validateCataloging) //Check the token before running any of the following functions, since all of this operations require a token

router.route('/public').get(_book2.default.listPublic);

router.route('/subjects').get(_authentication2.default.checkToken, _permission2.default.validateCataloging, _book2.default.getCatalogData);

router.route('/authorspublishers/').get(_authentication2.default.checkToken, _permission2.default.validateTransactions, _book2.default.getAuthorPub);

router.route('/:bookId/setcatalog').post(_authentication2.default.checkToken, _permission2.default.validateCataloging, _book2.default.setCatalog);

router.route('/:bookId/finishcatalog').post(_authentication2.default.checkToken, _permission2.default.validateCataloging, _book2.default.finishCataloging);

router.route('/:bookId/public').get(_book2.default.getPublic);

router.route('/:bookId').get(_authentication2.default.checkToken, _permission2.default.validateGetBook, _book2.default.get);

exports.default = router;