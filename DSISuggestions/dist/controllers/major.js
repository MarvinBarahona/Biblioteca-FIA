'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _major = require('../validations/major');

var _major2 = _interopRequireDefault(_major);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = _models2.default.Course;
var Major = _models2.default.Major;

function list(request, response, next) {
  var majorPms = Major.findAll({ attributes: ['id', 'name'] });
  var coursesPms = Course.findAll({ attributes: ['id', 'name', 'code', 'MajorId'] });
  Promise.all([majorPms, coursesPms]).then(function (values) {
    response.status(200).json({ majors: values[0], courses: values[1] });
  }).catch(next);
}

function massCreate(request, response, next) {

  var errors = _major2.default.massCreateValidation(request);

  if (errors != false) {
    response.send(errors);
    return;
  } else {
    var majors = request.body.majors;
    _models2.default.sequelize.transaction(function (t) {
      var majorPromises = majors.map(function (m) {
        return Major.create(m, { transaction: t, include: [{ model: _models2.default.Course, as: 'courses' }] });
      });
      return Promise.all(majorPromises).then(function () {
        response.status(201).json({ message: 'Created all majors and subjects' });
      });
    }).catch(next);
  }
}

exports.default = { list: list, massCreate: massCreate };