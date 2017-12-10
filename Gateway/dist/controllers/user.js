'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(request, response, next) {
  var options = {
    method: 'POST',
    uri: process.env.USERS_HOST + 'users/',
    json: true,
    body: request.body
  };

  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    var info = { userId: rep.user.id, userName: rep.user.fullname, email: rep.user.email };
    var options2 = {
      method: 'POST',
      uri: process.env.TRANS_HOST + 'profiles/',
      json: true,
      body: info
    };
    return (0, _requestPromiseNative2.default)(options2);
  }).then(function (prof) {
    response.status(201).json({ message: 'User and profile created' });
  }).catch(next);
}

function list(request, response, next) {
  var options = {
    uri: process.env.USERS_HOST + 'users/',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json(rep);
  }).catch(next);
}

function get(request, response, next) {
  // TODO: Review this method, make it more efficient or replace it all together
  var userId = request.params.userId;
  var options = {
    uri: process.env.USERS_HOST + 'users/' + userId,
    json: true
  };
  var optionsPol = {
    uri: process.env.USERS_HOST + 'policies/',
    json: true
  };

  Promise.all([(0, _requestPromiseNative2.default)(options), (0, _requestPromiseNative2.default)(optionsPol)]).then(function (values) {
    var user = values[0];
    var allpolicies = values[1];

    for (var i = 0; i < allpolicies.length; i++) {
      allpolicies[i].group = false;
      var policy = allpolicies[i].code;

      if (user.addedPol.includes(policy)) {
        allpolicies[i].hasIt = true;
      } else if (user.groupPol.includes(policy)) {
        allpolicies[i].hasIt = true;
        allpolicies[i].group = true;
      } else allpolicies[i].hasIt = false;
    }

    user.Policies = allpolicies;

    response.status(200).json(user);
  }).catch(next);
}

function update(request, response, next) {
  var userId = request.params.userId;
  var toUpdate = request.body;
  var options = {
    method: 'PUT',
    uri: process.env.USERS_HOST + 'users/' + userId,
    body: toUpdate,
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json({ message: 'Usuario actualizado' });
  }).catch(next);
}

function listGroups(request, response, next) {
  var options = {
    uri: process.env.USERS_HOST + 'groups/',
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (groups) {
    response.status(200).json(groups);
  }).catch(next);
}

function setPolicies(request, response, next) {
  var userId = request.params.userId;
  var options = {
    method: 'POST',
    uri: process.env.USERS_HOST + 'users/' + userId + '/setPolicies',
    json: true,
    body: request.body
  };
  (0, _requestPromiseNative2.default)(options).then(function () {
    response.status(200).json({ message: 'Policies added' });
  }).catch(next);
}

function remove(request, response, next) {
  var userId = request.params.userId;
  var options = {
    method: 'DELETE',
    uri: process.env.USERS_HOST + 'users/' + userId,
    json: true
  };
  (0, _requestPromiseNative2.default)(options).then(function (rep) {
    response.status(200).json({ message: 'Usuario eliminado' });
  }).catch(next);
}

exports.default = { list: list, get: get, update: update, create: create, remove: remove, listGroups: listGroups, setPolicies: setPolicies };