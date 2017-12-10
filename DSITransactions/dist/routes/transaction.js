'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _transaction = require('../controllers/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_transaction2.default.list);

router.route('/purchase').post(_transaction2.default.getType, _transaction2.default.acquisition);

router.route('/donation').post(_transaction2.default.getType, _transaction2.default.acquisition);

router.route('/tradeout').post(_transaction2.default.getType, _transaction2.default.valSalida, _transaction2.default.existing);

router.route('/tradein').post(_transaction2.default.getType, _transaction2.default.association, _transaction2.default.acquisition);

router.route('/reservations').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.existing);

router.route('/loans').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/renewals').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/annulments').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/returns').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/retirement').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.existing);

router.route('/damages').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/losses').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/restores').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/exonerations').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/substitutions').post(_transaction2.default.getType, _transaction2.default.valTran, _transaction2.default.association, _transaction2.default.existing);

router.route('/repositions').post(_transaction2.default.getType, _transaction2.default.association, _transaction2.default.acquisition);

router.route('/discards').post(_transaction2.default.getType, _transaction2.default.valSalida, _transaction2.default.existing);

router.route('/:transactionId').get(_transaction2.default.get);
// .put(tranCtrl.update)
// .delete(tranCtrl.destroy)

router.param('transactionId', _transaction2.default.load);

exports.default = router;