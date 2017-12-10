'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validateManagement$v;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validateManagement(request, response, next) {
  if (request.user.Policies.includes(101)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to manage employees' });
  }
}

function validateTransactions(request, response, next) {
  if (request.user.Policies.includes(113)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to create transactions - 113' });
  }
}

function validateExchange(request, response, next) {
  if (request.user.Policies.includes(114)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to create exchanges - 114' });
  }
}

function validateActivation(request, response, next) {
  if (request.user.Policies.includes(223)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to change states - 223' });
  }
}

function validateCataloging(request, response, next) {
  if (request.user.Policies.includes(122)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to catalog - 122' });
  }
}

function validateGetBook(request, response, next) {
  if (request.user.Policies.includes(142)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to get books - 142' });
  }
}

function validateCopyGet(request, response, next) {
  if (request.user.Policies.includes(143)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to get copies - 143' });
  }
}

function validateStudent(request, response, next) {
  if (request.user.Policies.includes(410)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to get suggest - 410' });
  }
}

function validateTeacher(request, response, next) {
  if (request.user.Policies.includes(420)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to get order - 420' });
  }
}

function validateSuggestions(request, response, next) {
  if (request.user.Policies.includes(400)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to view suggestions - 400' });
  }
}

function validateReservation(request, response, next) {
  if (request.user.Policies.includes(235)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to reserve books - 235' });
  }
}

function validateLoan(request, response, next) {
  if (request.user.Policies.includes(215)) {
    next();
  } else {
    response.status(403).json({ error: 'You are not authorized to do loans - 215' });
  }
}

exports.default = (_validateManagement$v = { validateManagement: validateManagement, validateTransactions: validateTransactions, validateCataloging: validateCataloging, validateGetBook: validateGetBook, validateCopyGet: validateCopyGet, validateExchange: validateExchange, validateActivation: validateActivation
}, _defineProperty(_validateManagement$v, 'validateGetBook', validateGetBook), _defineProperty(_validateManagement$v, 'validateStudent', validateStudent), _defineProperty(_validateManagement$v, 'validateTeacher', validateTeacher), _defineProperty(_validateManagement$v, 'validateSuggestions', validateSuggestions), _defineProperty(_validateManagement$v, 'validateReservation', validateReservation), _defineProperty(_validateManagement$v, 'validateLoan', validateLoan), _validateManagement$v);