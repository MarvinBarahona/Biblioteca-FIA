'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Copy = _models2.default.Copy;
var Transaction = _models2.default.Transaction;

function list(request, response, next) {
  var empty = !Object.keys(request.query).length;
  var filter = empty ? {} : request.query;
  Copy.findAll({ where: filter, attributes: ['id', 'barcode', 'state', 'bookId'] }).then(function (copies) {
    response.status(200).json(copies);
  }).catch(next);
}

function byBook(request, response, next) {
  Copy.findAll({ where: { bookId: request.params.bookId }, attributes: ['id', 'barcode', 'state'] }).then(function (copies) {
    response.status(200).json(copies);
  }).catch(next);
}

function lastByBarcode(request, response, next) {
  Copy.findOne({ where: { barcode: request.params.barcode }, attributes: ['id', 'state', 'barcode'], include: { model: Transaction, as: 'transactions', attributes: ['id', 'createdAt', 'type', 'details'],
      through: { attributes: [] }, include: { model: _models2.default.Profile, as: 'users', attributes: ['userId', 'userName'], through: { attributes: [] } } } }).then(function (copy) {
    if (!copy) return response.status(404).json({ error: 'Copy not found' });
    var transbody = {};
    transbody.copy = { id: copy.id, state: copy.state, barcode: copy.barcode };
    transbody.transaction = copy.transactions.pop();

    response.status(200).json(transbody);
  }).catch(next);
}

function load(request, response, next, id) {
  //Long query, but the execution is quick
  Copy.findOne({ where: { id: id }, attributes: ['id', 'barcode', 'state', 'bookId'],
    include: [{ model: Transaction, as: 'transactions', attributes: ['id', 'notes', 'single', 'type', 'details', 'createdAt', 'userName'], through: { attributes: [] } }] }).then(function (copy) {
    if (!copy) return response.status(404).json({ error: 'Copy not found' });
    request.copyQueried = copy;
    next();
  }).catch(next);
}

function get(request, response, next) {
  response.status(200).json(request.copyQueried);
}

function update(request, response, next) {
  var copyToUp = request.copyQueried;

  // Later on this will be another table
  switch (copyToUp.state) {
    case 'Inactivo':
      request.body.state = 'Disponible';
      break;
    case 'Disponible':
      request.body.state = 'Inactivo';
      break;

    default:
      response.status(422).json({ message: 'State doesnt meet requirements' });
  }

  Object.assign(copyToUp, request.body);
  copyToUp.save().then(function () {
    response.status(200).json({ message: 'Updated' });
  }).catch(next);
}

function massCataloging(request, response, next) {
  var copies = request.body.copies;
  var promises = copies.map(function (c) {
    return Copy.update({ barcode: c.barcode, state: 'Inactivo' }, { where: { id: c.id } });
  });
  Promise.all(promises).then(function (values) {
    response.status(200).json();
  }).catch(next);
}

function getOld(request, response, next) {
  var oneYearBefore = new Date(new Date() - 24 * 60 * 60 * 1000 * 365);
  Copy.findAll({ where: _defineProperty({}, _models2.default.Sequelize.Op.and, [{ state: _defineProperty({}, _models2.default.Sequelize.Op.not, 'Retirado') }, { updatedAt: _defineProperty({}, _models2.default.Sequelize.Op.lt, oneYearBefore) }]) }).then(function (copies) {
    response.status(200).json(copies);
  }).catch(next);
}
// function destroy(request, response, next) {
//   let copyToDel = request.copyQueried
//    copyToDel.destroy().then(()=>{
//      response.status(200).json({message: 'Deleted'})
//    }).catch(next)
// }


exports.default = { list: list, load: load, get: get, update: update, massCataloging: massCataloging, byBook: byBook, lastByBarcode: lastByBarcode, getOld: getOld };