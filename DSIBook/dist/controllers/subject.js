'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subject = _models2.default.Subject; //import the model


function list(request, response, next) {
  Subject.findAll({ attributes: ['id', 'name'] }).then(function (subjects) {
    response.status(200).json(subjects);
  }).catch(next);
}

function create(request, response, next) {
  Subject.create(request.body).then(function (saved) {
    response.status(201).json(saved);
  }).catch(next);
}

function load(request, response, next, id) {
  Subject.findById(id).then(function (subject) {
    if (!subject) response.status(404).json({ message: 'Subject not found' });
    request.subjectQueried = subject;
    next();
  }).catch(next);
}

function get(request, response, next) {
  response.status(200).json(request.subjectQueried);
}

function update(request, response, next) {
  var subjectToUpdate = request.subjectQueried;
  Object.assign(subjectToUpdate, request.body);
  subjectToUpdate.save().then(function () {
    response.status(200).json({ message: 'Updated' });
  }).catch(next);
}

function destroy(request, response, next) {
  var subjectToDelete = request.subjectQueried;
  subjectToDelete.destroy().then(function () {
    response.status(200).json({ message: 'Deleted' });
  }).catch(next);
}

exports.default = { list: list, create: create, load: load, get: get, update: update, destroy: destroy };