'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Author = _models2.default.Author;
var Publisher = _models2.default.Publisher;

function list(request, response, next) {
  Author.findAll({ attributes: ['id', 'name'] }).then(function (authors) {
    response.status(200).json(authors);
  }).catch(next);
}

function create(request, response, next) {
  Author.create(request.body).then(function (saved) {
    response.status(201).json(saved);
  }).catch(next);
}

function load(request, response, next, id) {
  if (/([^0-9])+/g.test(id)) return response.status(422).json({ error: 'Invalid author id' });
  Author.findById(id).then(function (author) {
    if (!author) response.status(404).json({ message: 'Author not found' });
    request.authorQueried = author;
    next();
  }).catch(next);
}

function get(request, response, next) {
  response.status(200).json(request.authorQueried);
}

function update(request, response, next) {
  var authorToUpdate = request.authorQueried;
  Object.assign(authorToUpdate, request.body);
  authorToUpdate.save().then(function () {
    response.status(200).json({ message: 'Updated' });
  }).catch(next);
}

function destroy(request, response, next) {
  var authorToDelete = request.authorQueried;
  authorToDelete.destroy().then(function () {
    response.status(200).json({ message: 'Deleted' });
  }).catch(next);
}

function getAuthoPub(request, response, next) {
  var authors = Author.findAll({ attributes: ['id', 'name'] });
  var publishers = Publisher.findAll({ attributes: ['id', 'name'] });
  Promise.all([authors, publishers]).then(function (values) {
    response.status(200).json({ authors: values[0], publishers: values[1] });
  }).catch(next);
}

exports.default = { list: list, create: create, load: load, get: get, update: update, destroy: destroy, getAuthoPub: getAuthoPub };