'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transaction = _models2.default.Transaction;
var Copy = _models2.default.Copy;
var Profile = _models2.default.Profile;

function getType(request, response, next) {
  var transactionType = void 0;
  var copyState = void 0;

  var flags = { state: false, relatedTran: false, tranType: '', copyState: '', recycleUser: false, mutualRel: false,
    reqState: [], increase: false, updateUser: false, decrease: false, penalize: false, excuse: false };
  flags.users = [request.body.userId];

  switch (request.url) {
    case '/purchase':
      flags.tranType = 'Compra';
      break;

    case '/donation':
      flags.tranType = 'Donación';
      break;

    case '/tradein':
      flags.tranType = 'Entrada';
      flags.mutualRel = true;
      break;

    case '/tradeout':
      flags.tranType = 'Salida';
      flags.copyState = 'Retirado';
      flags.state = true;
      flags.reqState.push('Inactivo');
      break;

    case '/reservations':
      flags.tranType = 'Reservación';
      flags.copyState = 'Reservado';
      flags.state = true;
      flags.reqState.push('Disponible');
      flags.increase = true;
      break;

    case '/loans':
      flags.tranType = 'Préstamo';
      flags.copyState = 'Prestado';
      flags.state = true;
      flags.recycleUser = true;
      flags.mutualRel = true;
      flags.reqState.push('Reservado');
      break;

    case '/renewals':
      flags.tranType = 'Renovación';
      flags.recycleUser = true;
      flags.reqState.push('Prestado');
      break;

    case '/returns':
      flags.tranType = 'Devolución';
      flags.copyState = 'Disponible';
      flags.state = true;
      flags.recycleUser = true;
      flags.reqState.push('Prestado');
      flags.decrease = true;
      flags.penalize = true;
      break;

    case '/annulments':
      flags.tranType = 'Cancelación';
      flags.copyState = 'Disponible';
      flags.state = true;
      flags.mutualRel = true;
      flags.reqState.push('Reservado');
      flags.decrease = true;
      break;

    case '/retirement':
      flags.tranType = 'Retiro';
      flags.copyState = 'Retirado';
      flags.state = true;
      flags.reqState.push('Disponible', 'Inactivo');
      break;

    case '/damages':
      flags.tranType = 'Daño';
      flags.copyState = 'Inhabilitado';
      flags.state = true;
      flags.reqState.push('Prestado');
      flags.recycleUser = true;
      flags.penalize = true;
      flags.decrease = true;
      break;

    case '/losses':
      flags.tranType = 'Extravío';
      flags.copyState = 'Inhabilitado';
      flags.state = true;
      flags.reqState.push('Prestado');
      flags.recycleUser = true;
      flags.penalize = true;
      flags.decrease = true;
      break;

    case '/restores':
      flags.tranType = 'Restauración';
      flags.copyState = 'Inactivo';
      flags.state = true;
      flags.reqState.push('Inhabilitado');
      flags.recycleUser = true;
      flags.excuse = true;
      break;

    case '/exonerations':
      flags.tranType = 'Exoneración';
      flags.copyState = 'Retirado';
      flags.state = true;
      flags.reqState.push('Inhabilitado');
      flags.recycleUser = true;
      flags.excuse = true;
      break;

    case '/substitutions':
      flags.tranType = 'Sustitución';
      flags.copyState = 'Retirado';
      flags.state = true;
      flags.reqState.push('Inhabilitado');
      flags.recycleUser = true;
      break;

    case '/repositions':
      flags.tranType = 'Reposición';
      break;

    case '/discards':
      flags.tranType = 'Descarte';
      flags.copyState = 'Retirado';
      flags.state = true;
      flags.reqState.push('Inactivo');
  }

  request.flags = flags;
  next();
}

function association(request, response, next) {

  Transaction.findById(request.body.transactionId).then(function (tran) {
    if (!tran) return response.status(422).json({ message: 'La transaccion solicitada no existe' });
    request.flags.transaction = tran;
    request.flags.relatedTran = true;
    if (request.flags.recycleUser) request.flags.users.push(request.body.details.userId);
    next();
  }).catch(next);
}

function acquisition(request, response, next) {
  var tranResponse = {};
  // Parsing the copies
  var copies = [];
  var single = true;
  var b = request.body;
  //Check for only one copy if its not present just use the array
  if (b.copies.length === 1 && b.copies[0].quantity === 1) copies.push({ bookId: b.copies[0].bookId, barcode: b.copies[0].barcode, state: 'Inactivo' });else {
    single = false;
    for (var i = 0; i < b.copies.length; i++) {
      for (var j = 0; j < b.copies[i].quantity; j++) {
        copies.push({ bookId: b.copies[i].bookId });
      }
    }
  }
  // End of copy parsing

  var acquisition = { notes: b.notes, single: single, copies: copies, userName: b.userName, details: b.details, type: request.flags.tranType };

  _models2.default.sequelize.transaction(function (t) {
    return Transaction.create(acquisition, { transaction: t, include: [{ model: Copy, as: 'copies' }] }).then(function (tran) {
      tranResponse = tran;
      var associations = [];
      var users = request.flags.users.map(function (u) {
        return tran.addUsers(u, { transaction: t });
      });
      associations = associations.concat(users);

      if (request.flags.relatedTran) {
        associations.push(tran.setRelated(request.flags.transaction, { transaction: t }));
        if (request.flags.mutualRel) associations.push(request.flags.transaction.setRelated(tran, { transaction: t }));
      }

      return Promise.all(associations);
    });
  }).then(function (values) {
    response.status(201).json(tranResponse);
  }).catch(next);
}

function existing(request, response, next) {
  var tranResponse = {};
  var b = request.body;
  var single = false;
  if (b.copies.length === 1) single = true;
  var copies = b.copies;

  var transaction = { notes: b.notes, single: single, userName: b.userName, details: b.details, type: request.flags.tranType };

  _models2.default.sequelize.transaction(function (t) {
    return Transaction.create(transaction, { transaction: t }).then(function (tran) {
      tranResponse = tran;
      var users = request.flags.users.map(function (u) {
        return tran.addUsers(u, { transaction: t });
      });
      var associations = copies.map(function (copy) {
        return tran.addCopies(copy, { transaction: t });
      });
      associations = associations.concat(users);
      if (request.flags.relatedTran) {
        associations.push(tran.setRelated(request.flags.transaction, { transaction: t }));
        if (request.flags.mutualRel) associations.push(request.flags.transaction.setRelated(tran, { transaction: t }));
      }
      if (request.flags.state) {
        associations.push(Copy.changeStates(copies, request.flags.copyState, t));
      }
      if (request.flags.updateUser) {
        if (request.flags.increase) request.studentProf.transactionsDone++;
        if (request.flags.decrease) request.studentProf.transactionsDone--;
        if (request.flags.penalize) {
          var p = request.flags.transaction.details.returnDate.split('/');
          var returnDate = new Date(p[2], p[0] - 1, p[1]);
          if (tran.createdAt.getTime() > returnDate.getTime()) request.studentProf.penalized = true;
        }
        if (request.flags.excuse) request.studentProf.penalized = false;
        request.studentProf.lastTransaction = tran.createdAt;
        associations.push(request.studentProf.save({ transaction: t }));
      }

      return Promise.all(associations);
    });
  }).then(function (values) {
    response.status(201).json(tranResponse);
  }).catch(next);
}

function valTran(request, response, next) {
  // This checks if the copy is in the correct state to be transacted
  // Checks if the user is not penalized or already has too much transactions to its name
  // Decreases or increases this number according to the transaction type
  if (['Compra', 'Donación', 'Entrada', 'Reposición'].indexOf(request.flags.tranType) > -1) return next();

  var userId = void 0;
  if (['Reservación', 'Retiro'].indexOf(request.flags.tranType) > -1) userId = request.body.userId;else userId = request.body.details.userId;
  var copyP = Copy.findById(request.body.copies[0]);
  var userP = Profile.findById(userId);

  Promise.all([userP, copyP]).then(function (values) {
    var profile = values[0];
    var copy = values[1];
    if (!profile || !copy) return response.status(400).json({ message: 'User or copy does not exist' });

    var invalidate = false;

    if (request.flags.tranType == 'Retiro') {
      if (request.flags.reqState.indexOf(copy.state) === -1) invalidate = true;
    } else {
      if (copy.state != request.flags.reqState[0]) invalidate = true;
    }

    if ((request.flags.increase && profile.transactionsDone >= 3 || profile.penalized) && request.flags.tranType !== 'Salida' && !request.flags.excuse) invalidate = true;

    if (invalidate) return response.status(400).json({ error: 'Transaction cannot be done, user not eligible or copies in invalid state' });

    request.flags.updateUser = true;
    request.studentProf = profile;
    next();
  }).catch(next);
}

function valSalida(request, response, next) {
  var invalidate = false;
  var copiesP = request.body.copies.map(function (c) {
    return Copy.findById(c);
  });
  Promise.all(copiesP).then(function (copies) {

    for (var i = 0; i < copies.length; i++) {
      if (copies[i].state != request.flags.reqState[0]) {
        invalidate = true;
        break;
      }
    }

    if (invalidate) return response.status(400).json({ error: 'copies in invalid state' });
    next();
  }).catch(next);
}

function list(request, response, next) {
  var empty = !Object.keys(request.query).length;
  var filter = empty ? {} : request.query;
  Transaction.findAll({ where: filter, attributes: ['id', 'notes', 'createdAt', 'type', 'userName', 'RelatedId', 'details'],
    include: [{ model: Profile, as: 'users', attributes: ['userId', 'email', 'userName'], through: { attributes: [] } }] }).then(function (transactions) {
    response.status(200).json(transactions);
  }).catch(next);
}

function load(request, response, next, id) {
  Transaction.findOne({ where: { id: id }, attributes: ['id', 'notes', 'type', 'createdAt', 'userName', 'details'],
    include: [{ model: Copy, as: 'copies', attributes: ['id', 'barcode', 'state', 'bookId'], through: { attributes: [] } }, { model: Transaction, as: 'Related', attributes: ['id', 'notes', 'type', 'userName'] }, { model: Profile, as: 'users', attributes: ['userId', 'email', 'userName'], through: { attributes: [] } }] }).then(function (tran) {
    if (tran) {
      request.tranQueried = tran;
      next();
    } else {
      response.status(404).json({ error: 'Transaction not found' });
    }
  }).catch(next);
}

function get(request, response, next) {
  response.status(200).json(request.tranQueried);
}

exports.default = { list: list, load: load, get: get, acquisition: acquisition, existing: existing, association: association, getType: getType, valTran: valTran, valSalida: valSalida };