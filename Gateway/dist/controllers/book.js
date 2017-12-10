'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(request, response, next) {
  var options = {
    uri: process.env.BOOKS_HOST + 'books' + request.url,
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (books) {
    response.status(200).json(books);
  }).catch(next);
}

function listPublic(request, response, next) {
  var arrayS = request.url.split('?');
  var filter = arrayS.length == 1 ? '' : '&' + arrayS[1];
  var options = {
    uri: process.env.BOOKS_HOST + 'books?catalogued=1&orderBy=createdAt&limit=10' + filter, //Filtros adicionales requeridos por esta ruta
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (books) {
    response.status(200).json(books);
  }).catch(next);
}

function create(request, response, next) {
  var options = {
    method: 'POST',
    body: request.body,
    uri: process.env.BOOKS_HOST + 'books',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (bookCreated) {
    response.status(200).json(bookCreated);
  }).catch(next);
}

function get(request, response, next) {
  var bookId = request.params.bookId;
  var options = {
    uri: process.env.BOOKS_HOST + 'books/' + bookId,
    json: true
  };

  var bookToShow = {};

  (0, _requestPromiseNative2.default)(options).then(function (book) {
    var options2 = {
      uri: process.env.TRANS_HOST + 'copies/byBook/' + bookId,
      json: true
    };
    bookToShow = book;
    return (0, _requestPromiseNative2.default)(options2);
  }).then(function (copies) {
    response.status(200).json({ book: bookToShow, copies: copies });
  }).catch(next);
}

function getPublic(request, response, next) {
  var bookId = request.params.bookId;
  var options = {
    uri: process.env.BOOKS_HOST + 'books/' + bookId + '?catalogued=1',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (book) {
    response.status(200).json(book);
  }).catch(next);
}

function getAuthorPub(request, response, next) {
  var options = {
    uri: process.env.BOOKS_HOST + 'authors/authorPub',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (aupubs) {
    response.status(200).json(aupubs);
  }).catch(next);
}

function getCatalogData(requets, response, next) {

  var options = {
    uri: process.env.BOOKS_HOST + 'subjects',
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (subjects) {
    response.status(200).json(subjects);
  }).catch(next);
}

function update(request, response, next) {
  response.status(200).json({ message: 'Feature not available' });
}

function setCatalog(request, response, next) {
  var bookId = request.params.bookId;
  var options = {
    method: 'POST',
    body: request.body,
    uri: process.env.BOOKS_HOST + 'books/' + bookId + '/setCataloging',
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json(rep);
  }).catch(next);
}

function finishCataloging(request, response, next) {
  var bookId = request.params.bookId;
  var options = {
    method: 'POST',
    uri: process.env.BOOKS_HOST + 'books/' + bookId + '/finishCataloging',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json(rep);
  }).catch(next);
}

exports.default = { list: list, create: create, get: get, getCatalogData: getCatalogData, update: update, setCatalog: setCatalog, finishCataloging: finishCataloging, getAuthorPub: getAuthorPub, listPublic: listPublic, getPublic: getPublic };