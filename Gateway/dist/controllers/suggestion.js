'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(request, response, next) {
  var values = request.url.split('?');
  var filter = values.length == 1 ? '' : values[1];

  var options = {
    uri: process.env.SUGGS_HOST + 'suggestions?' + filter,
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (suggestions) {
    response.status(200).json(suggestions);
  }).catch(next);
}

function get(request, response, next) {

  var suggId = request.params.suggId;
  var options = {
    uri: process.env.SUGGS_HOST + 'suggestions/' + suggId,
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (suggestion) {
    response.status(200).json(suggestion);
  }).catch(next);
}

function update(request, response, next) {
  var suggId = request.params.suggId;
  var options = {
    method: 'PUT',
    body: request.body,
    uri: process.env.SUGGS_HOST + 'suggestions/' + suggId,
    json: true
  };

  (0, _requestPromiseNative2.default)(options).then(function (suggestion) {
    response.status(200).json(suggestion);
  }).catch(next);
}

function create(request, response, next) {
  request.body.userId = request.user.id;
  request.body.userName = request.user.fullname;
  var options = {
    method: 'POST',
    uri: '',
    json: true,
    body: request.body
  };

  switch (request.url) {
    case '/student':
      options.uri = process.env.SUGGS_HOST + 'suggestions/student';
      break;
    case '/teacher':
      options.uri = process.env.SUGGS_HOST + 'suggestions/teacher';
      break;
    default:
      return response.status(400).json();
  }

  (0, _requestPromiseNative2.default)(options).then(function (suggestion) {
    response.status(201).json(suggestion);
  }).catch(next);
}

function upvote(request, response, next) {

  var suggId = request.params.suggId;
  request.body.userId = request.user.id;
  request.body.userName = request.user.fullname;
  var options = {
    method: 'POST',
    uri: process.env.SUGGS_HOST + 'suggestions/' + suggId + '/upvote',
    json: true,
    body: request.body
  };

  (0, _requestPromiseNative2.default)(options).then(function (suggestion) {
    response.status(201).json(suggestion);
  }).catch(next);
}

function order(request, response, next) {
  var suggId = request.params.suggId;
  request.body.userId = request.user.id;
  request.body.userName = request.user.fullname;
  var options = {
    method: 'POST',
    uri: process.env.SUGGS_HOST + 'suggestions/' + suggId + '/orders',
    json: true,
    body: request.body
  };

  (0, _requestPromiseNative2.default)(options).then(function (suggestion) {
    response.status(201).json(suggestion);
  }).catch(next);
}

function listMajors(request, response, next) {
  var options = {
    uri: process.env.SUGGS_HOST + 'majors',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (majors) {
    response.status(200).json(majors);
  }).catch(next);
}

function history(request, response, next) {
  var userId = request.params.userId;
  var options = {
    method: 'GET',
    uri: process.env.SUGGS_HOST + 'suggestions/user/' + userId,
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (history) {
    response.status(200).json(history);
  }).catch(next);
}

function changePeriod(request, response, next) {
  var options = {
    method: 'DELETE',
    uri: process.env.SUGGS_HOST + 'suggestions/periods',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json();
  }).catch(next);
}

exports.default = { list: list, get: get, create: create, upvote: upvote, order: order, history: history, listMajors: listMajors, update: update, changePeriod: changePeriod };