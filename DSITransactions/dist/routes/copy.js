'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _copy = require('../controllers/copy');

var _copy2 = _interopRequireDefault(_copy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_copy2.default.list);

router.route('/byBook/:bookId').get(_copy2.default.byBook);

router.route('/:barcode/transaction').get(_copy2.default.lastByBarcode);

router.route('/old').get(_copy2.default.getOld);

router.route('/:copyId').get(_copy2.default.get).put(_copy2.default.update);
// .delete(copyController.destroy)

router.route('/massCataloging').post(_copy2.default.massCataloging);

router.param('copyId', _copy2.default.load);

exports.default = router;