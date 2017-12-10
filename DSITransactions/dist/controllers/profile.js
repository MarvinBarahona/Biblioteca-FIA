'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = _models2.default.Profile;

function create(request, response, next) {
  Profile.create(request.body).then(function (profile) {
    response.status(201).json({ msg: 'Profile created', username: profile.userName });
  }).catch(next);
}

function list(request, response, next) {
  Profile.findAll({ attributes: ['userId', 'userName', 'email', 'penalized'] }).then(function (users) {
    response.status(200).json(users);
  }).catch(next);
}

function massUpdate(request, response, next) {
  var promises = request.body.map(function (u) {
    return Profile.update({ email: u.email }, { where: { userId: u.id } });
  });
  Promise.all(promises).then(function (values) {
    response.status(200).json({ message: 'All updated' });
  }).catch(next);
}

function update(request, response, next) {
  var profId = request.params.profId;
  Profile.findById(profId).then(function (profile) {
    if (!profile) return response.status(404).json({ message: 'El perfil no existe' });
    Object.assign(profile, request.body);
    return profile.save().then(function () {
      response.status(200).json(profile);
    });
  }).catch(next);
}

exports.default = { create: create, list: list, massUpdate: massUpdate, update: update };