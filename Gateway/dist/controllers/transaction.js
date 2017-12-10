'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(request, response, next) {
  var tranId = request.params.tranId;

  var options1 = {
    uri: process.env.TRANS_HOST + 'transactions/' + tranId,
    json: true
  };

  var tranToShow = {};
  var books = [];

  (0, _requestPromiseNative2.default)(options1).then(function (tran) {
    // Implement it with cache, this is only done because it needs to be done by August 31
    tranToShow = tran;
    var copies = tran.copies;

    for (var i = 0; i < copies.length; i++) {
      if (!books.includes(copies[i].bookId)) books.push(copies[i].bookId);
    }
    var promises = [];

    for (var i = 0; i < books.length; i++) {
      promises.push((0, _requestPromiseNative2.default)({ uri: process.env.BOOKS_HOST + 'books/minimal/' + books[i], json: true }));
    }
    return Promise.all(promises);
  }).then(function (values) {

    for (var i = 0; i < tranToShow.copies.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (tranToShow.copies[i].bookId === values[j].id) {
          tranToShow.copies[i].book = values[j];
        }
      }
      delete tranToShow.copies[i].bookId;
    }

    response.status(200).json(tranToShow);
  }).catch(next);
}

function createT(request, response, next) {
  request.body.userId = request.user.id;
  request.body.userName = request.user.fullname;

  var options = {
    method: 'POST',
    body: request.body,
    uri: process.env.TRANS_HOST + 'transactions' + request.url,
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    if (request.url == 'substitutions') next();
    response.status(201).json(rep);
  }).catch(next);
}

function createSubstitution(request, response, next) {
  request.body.substitution.userId = request.user.id;
  request.body.substitution.userName = request.user.fullname;
  request.body.replacement.userId = request.user.id;
  request.body.replacement.userName = request.user.fullname;

  // First verify if the barcode specified
  var options0 = {
    method: 'GET',
    uri: process.env.TRANS_HOST + 'copies?barcode=' + request.body.replacement.copies[0].barcode,
    json: true
  };
  (0, _requestPromiseNative2.default)(options0).then(options0).then(function (copy) {
    if (copy.length != 0) return response.status(422).json({ message: 'Un ejemplar con ese código de barras ya existe' });
    var repTran = {};
    var options1 = {
      method: 'POST',
      body: request.body.substitution,
      uri: process.env.TRANS_HOST + 'transactions/substitutions',
      json: true
    };
    return (0, _requestPromiseNative2.default)(options1).then(function (rep) {
      request.body.replacement.transactionId = rep.id;
      var options2 = {
        method: 'POST',
        body: request.body.replacement,
        uri: process.env.TRANS_HOST + 'transactions/repositions',
        json: true
      };
      return (0, _requestPromiseNative2.default)(options2).then(function (rep) {
        repTran = rep;
        var options3 = {
          method: 'PUT',
          body: { penalized: false },
          uri: process.env.TRANS_HOST + 'profiles/' + request.body.substitution.details.userId,
          json: true
        };
        return (0, _requestPromiseNative2.default)(options3).then(function (user) {
          response.status(201).json(repTran);
        });
      });
    });
  }).catch(next);
}

exports.default = { get: get, createT: createT, createSubstitution: createSubstitution };