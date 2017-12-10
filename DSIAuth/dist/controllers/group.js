'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = _models2.default.Group;

function list(request, response, next) {
  Group.findAll({ attributes: ['id', 'name'] }).then(function (groups) {
    response.status(200).json(groups);
  }).catch(next);
}

function create(request, response, next) {
  var group = request.body;
  Group.findOrCreate({ where: { name: group.name }, defaults: { code: group.code } }).spread(function (group, created) {
    //created its a flag that indicated the row creation
    if (!created) {
      response.status(422).json({ error: 'Group already exists' });
    } else {
      response.status(201).json(group);
    }
  }).catch(next);
}

function load(request, response, next, id) {
  // Validation of the integer with a regex
  if (/([^0-9])+/g.test(id)) return response.status(422).json({ error: 'Invalid user id' });
  Group.findById(id).then(function (group) {
    if (group) {
      request.groupQueried = group;
      next();
    } else {
      response.status(404).json({ error: 'Group not found' });
    }
  }).catch(next);
}

function get(request, response) {
  response.status(200).json(request.groupQueried);
}

function update(request, response, next) {
  var group = request.groupQueried;
  Object.assign(group, request.body);
  group.save().then(function () {
    response.status(200).json({ message: 'Changes saved' });
  }).catch(next);
}

function destroy(request, response, next) {
  //We are deleting now, in the future we can make it so its moved to a table
  var group = request.groupQueried;
  group.destroy().then(function () {
    response.status(200).json({ message: 'Object deleted' });
  }).catch(next);
}

function addPolicies(request, response, next) {
  var policies = request.body.policies;
  var promises = policies.map(function (pol) {
    return request.groupQueried.addPolicy(pol);
  });
  Promise.all(promises).then(function (values) {
    response.status(201).json({ message: 'Policies added to group' });
  }).catch(next);
}

function removePolicies(request, response, next) {
  var policies = request.body.policies;
  var promises = policies.map(function (pol) {
    return request.groupQueried.removePolicy(pol);
  });
  Promise.all(promises).then(function (values) {
    response.status(201).json({ message: 'Policies removed from group' });
  }).catch(next);
}

exports.default = { list: list, create: create, load: load, get: get, update: update, destroy: destroy, addPolicies: addPolicies, removePolicies: removePolicies };