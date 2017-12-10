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

var _transaction = require('../controllers/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/:tranId').get(_authentication2.default.checkToken, _permission2.default.validateCopyGet, _transaction2.default.get);

router.use(_authentication2.default.checkToken);

router.route('/purchase').post(_permission2.default.validateTransactions, _transaction2.default.createT);

router.route('/donation').post(_permission2.default.validateTransactions, _transaction2.default.createT);

router.route('/tradeout').post(_permission2.default.validateExchange, _transaction2.default.createT);

router.route('/tradein').post(_permission2.default.validateTransactions, _transaction2.default.createT);

router.route('/reservations').post(_permission2.default.validateSuggestions, _transaction2.default.createT);

router.route('/loans').post(_permission2.default.validateLoan, _transaction2.default.createT);

router.route('/renewals').post(_permission2.default.validateLoan, _transaction2.default.createT);

router.route('/annulments').post(_permission2.default.validateReservation, _transaction2.default.createT);

router.route('/returns').post(_permission2.default.validateLoan, _transaction2.default.createT);

router.route('/retirement').post(_permission2.default.validateCopyGet, _transaction2.default.createT);

router.route('/losses').post(_permission2.default.validateCopyGet, _transaction2.default.createT);

router.route('/damages').post(_permission2.default.validateCopyGet, _transaction2.default.createT);

router.route('/substitutions').post(_permission2.default.validateTransactions, _transaction2.default.createSubstitution);

router.route('/restores').post(_permission2.default.validateTransactions, _transaction2.default.createT);

router.route('/exonerations').post(_permission2.default.validateTransactions, _transaction2.default.createT);

router.route('/discards').post(_permission2.default.validateExchange, _transaction2.default.createT);

exports.default = router;