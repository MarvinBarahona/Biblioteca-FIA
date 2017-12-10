'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(request, response, next) {
  var options = {
    uri: process.env.TRANS_HOST + 'copies/',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (copies) {
    response.status(200).json(copies);
  }).catch(next);
}

function get(request, response, next) {
  var copyId = request.params.copyId;
  var options1 = {
    uri: process.env.TRANS_HOST + 'copies/' + copyId,
    json: true
  };
  var copyToShow = {};
  (0, _requestPromiseNative2.default)(options1).then(function (copy) {
    copyToShow = copy;
    var options2 = {
      uri: process.env.BOOKS_HOST + 'books/minimal/' + copy.bookId,
      json: true
    };
    return (0, _requestPromiseNative2.default)(options2);
  }).then(function (book) {
    delete copyToShow.bookId;
    response.status(200).json({ copy: copyToShow, book: book });
  }).catch(next);
}

function getByBarcode(request, response, next) {
  var barcode = request.params.barcode;
  var query = 'copies?barcode=' + barcode;
  if (request.query.inactive === '1') query = query.concat('&state=Inactivo');

  var options = {
    uri: process.env.TRANS_HOST + query,
    json: true
  };

  var copyBarcode = {};
  (0, _requestPromiseNative2.default)(options).then(function (copies) {
    if (copies.length === 0) return response.status(200).json({ message: 'Sin resultados' });

    var options2 = {
      uri: process.env.BOOKS_HOST + 'books/minimal/' + copies[0].bookId,
      json: true
    };

    delete copies[0].bookId;
    copyBarcode = copies[0];
    return (0, _requestPromiseNative2.default)(options2).then(function (book) {
      response.status(200).json({ copy: copyBarcode, book: book });
    });
  }).catch(next);
}

function lastByBarcode(request, response, next) {
  var barcode = request.params.barcode;
  var options = {
    uri: process.env.TRANS_HOST + 'copies/' + barcode + '/transaction',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (copy) {
    response.status(200).json(copy);
  }).catch(next);
}

function getLots(request, response, next) {
  var promises = [];

  switch (request.query.type) {
    case '1':
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Compra', json: true }), (0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Donación', json: true }));
      break;

    case '2':
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Salida', json: true }));
      break;

    case '3':
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Reservación', json: true }));
      break;
    case '4':
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Daño', json: true }), (0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Extravío', json: true }));
      break;

    case '5':
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.TRANS_HOST + 'transactions?type=Descarte', json: true }));
      break;

    default:
      promises.push((0, _requestPromiseNative2.default)({
        uri: process.env.TRANS_HOST + 'transactions?single=0',
        json: true
      }));
  }

  Promise.all(promises).then(function (trans) {
    response.status(200).json(trans);
  }).catch(next);
}

function massCatalog(request, response, next) {
  var options = {
    method: 'POST',
    body: request.body,
    uri: process.env.TRANS_HOST + 'copies/massCataloging',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json(rep);
  }).catch(next);
}

function putState(request, response, next) {
  var copyId = request.params.copyId;
  var options = {
    method: 'PUT',
    body: {},
    uri: process.env.TRANS_HOST + 'copies/' + copyId,
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json({ msg: 'Done' });
  }).catch(next);
}

function oldCopies(request, response, next) {
  var options = {
    uri: process.env.TRANS_HOST + 'copies/old',
    json: true
  };
  var books = [];
  var copies = [];
  (0, _requestPromiseNative2.default)(options).then(function (copiesR) {
    copies = copiesR;

    for (var i = 0; i < copies.length; i++) {
      if (!books.includes(copies[i].bookId)) books.push(copies[i].bookId);
    }
    var promises = [];

    for (var i = 0; i < books.length; i++) {
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.BOOKS_HOST + 'books/minimal/' + books[i], json: true }));
    }
    return Promise.all(promises).then(function (values) {

      for (var i = 0; i < copies.length; i++) {
        for (var j = 0; j < values.length; j++) {
          if (copies[i].bookId === values[j].id) {
            copies[i].book = values[j];
          }
        }
        delete copies[i].bookId;
      }

      response.status(200).json(copies);
    });
  }).catch(next);
}

exports.default = { list: list, get: get, getLots: getLots, getByBarcode: getByBarcode, massCatalog: massCatalog, putState: putState, lastByBarcode: lastByBarcode, oldCopies: oldCopies };