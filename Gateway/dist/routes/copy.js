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

var _copy = require('../controllers/copy');

var _copy2 = _interopRequireDefault(_copy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/massCataloging').post(_authentication2.default.checkToken, _permission2.default.validateCataloging, _copy2.default.massCatalog);

router.route('/:barcode/transaction').get(_authentication2.default.checkToken, _copy2.default.lastByBarcode);

router.route('/discards').get(_authentication2.default.checkToken, _permission2.default.validateExchange, _copy2.default.oldCopies);

router.route('/:copyId').put(_authentication2.default.checkToken, _permission2.default.validateActivation, _copy2.default.putState);

router.use(_authentication2.default.checkToken, _permission2.default.validateCopyGet); //Check the token before running any of the following functions, since all of this operations require a token

router.route('/').get(_copy2.default.list);

router.route('/lots').get(_copy2.default.getLots);

router.route('/barcode/:barcode').get(_copy2.default.getByBarcode);

router.route('/:copyId').get(_copy2.default.get);

exports.default = router;