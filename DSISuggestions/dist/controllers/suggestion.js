'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _suggestion = require('../validations/suggestion');

var _suggestion2 = _interopRequireDefault(_suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Suggestion = _models2.default.Suggestion;
var Uservote = _models2.default.Uservote;
var Proposal = _models2.default.Proposal;
var Course = _models2.default.Course;
var Order = _models2.default.Order;

function list(request, response, next) {
  var emptyQuery = !Object.keys(request.query).length;
  var limitQuery = emptyQuery ? null : 10;
  var filter = emptyQuery ? {} : request.query;
  var keys = Object.keys(filter);
  var order = [];

  var suggFilter = {};

  for (var i = 0; i < keys.length; i++) {
    if (keys[i] != 'code' && keys[i] != 'name') {
      if (keys[i] != 'state' && keys[i] != 'orderBy') filter[keys[i]] = { $iLike: '%' + filter[keys[i]] + '%' };
      if (keys[i] == 'orderBy') {
        order.push([filter[keys[i]], 'DESC']);
        delete filter[keys[i]];
      }
    } else {
      suggFilter[keys[i]] = { $iLike: '%' + filter[keys[i]] + '%' };
      delete filter[keys[i]];
    }
  }

  Suggestion.findAll({ where: filter, order: order, limit: limitQuery, attributes: ['id', 'title', 'edition', 'author', 'isbn', 'price', 'state', 'upvotes', 'orders', 'quantity', 'reason'],
    include: [{ where: suggFilter, association: 'Courses', attributes: ['code', 'name'], through: { attributes: [] } }]
  }).then(function (results) {
    response.status(200).json(results);
  }).catch(next);
}

function createSuggestion(request, response, next) {
  var suggestion = request.suggestion;

  _models2.default.sequelize.transaction(function (t) {

    return Suggestion.findOrCreate({ where: { isbn: suggestion.isbn }, defaults: suggestion, transaction: t }).spread(function (sugg, created) {
      if (!created) return response.status(422).json({ saved: false, suggestionId: sugg.id });
      return sugg.addCourse(request.body.subjectId, { through: request.through, returning: true, transaction: t }).then(function (prop) {
        var realProp = prop[0][0];
        var propProm = realProp.createUservote({ userId: request.body.userId, userName: request.body.userName, action: 'Creation', order: request.order, priority: request.priority }, { transaction: t, include: request.include });

        switch (request.userType) {
          case 'student':
            sugg.upvotes++;
            break;
          case 'teacher':
            sugg.orders++;
            break;
        }

        return Promise.all([propProm, sugg.save({ transaction: t })]).then(function (value) {
          response.status(201).json({ saved: true });
        });
      });
    });
  }).catch(next);
}

function getType(request, response, next) {

  var errors = _suggestion2.default.createSuggestValidation(request);

  if (errors) {
    response.send(errors);
    return;
  } else {
    switch (request.url) {
      case '/student':
        request.include = [];
        request.order = {};
        request.through = { upvotes: 1 };
        request.userType = 'student';
        request.priority = false;
        break;
      case '/teacher':
        request.include = [{ model: _models2.default.Order, as: 'order' }];
        request.order = { price: request.body.price, quantity: request.body.quantity };
        request.through = { orders: 1 };
        request.userType = 'teacher';
        request.priority = true;
        break;
    }

    var suggestion = Object.assign({}, request.body);
    delete suggestion.subjectId;
    delete suggestion.userId;
    delete suggestion.userName;
    delete suggestion.quantity;

    request.suggestion = suggestion;
    next();
  }
}

function load(request, response, next, id) {
  if (/([^0-9])+/g.test(id)) return response.status(422).json({ error: 'Invalid suggestion id' });
  Suggestion.findOne({ where: { id: id }, attributes: ['id', 'title', 'edition', 'author', 'isbn', 'publisher', 'price', 'state', 'upvotes', 'orders', 'quantity', 'reason'],
    include: [{ association: 'Courses', attributes: ['id', 'name'], through: { attributes: ['id', 'upvotes', 'orders'] } }] }).then(function (sugg) {
    if (!sugg) return response.status(404).json({ message: 'No suggestion with that id' });
    request.suggQueried = sugg;
    next();
  }).catch(next);
}

function get(request, response, next) {
  // Run a promise all to gather all the user votes from the proposal
  var promises = [];
  for (var i = 0; i < request.suggQueried.Courses.length; i++) {
    var prop = request.suggQueried.Courses[i].Proposal;
    promises.push(prop.getUservotes({ attributes: ['userId', 'userName', 'priority'] }));
  }

  Promise.all(promises).then(function (votes) {
    var formated = request.suggQueried.formatCourses(votes);
    response.status(200).json(formated);
  }).catch(next);
}

function update(request, response, next) {
  var suggestion = request.suggQueried;
  if (suggestion.state != 'Pendiente') return response.status(422).json({ error: 'La sugerencia ya fue finalizada' });
  Object.assign(suggestion, request.body);
  suggestion.save().then(function () {
    response.status(200).json(suggestion);
  }).catch(next);
}

function approve(request, response, next) {
  var suggestion = request.suggQueried;
  var course = suggestion.Courses.filter(function (c) {
    return c.id === parseInt(request.body.subjectId);
  });
  var newSubject = false;

  var proposal = {};

  if (!course[0]) newSubject = true;else proposal = course[0].Proposal;

  _models2.default.sequelize.transaction(function (t) {

    return suggestion.addCourse(request.body.subjectId, { returning: true, transaction: t }).then(function (value) {
      if (value.length != 0) proposal = value[0][0];
      return proposal.createUservote({ userId: request.body.userId, userName: request.body.userName, action: request.action, order: request.order, priority: request.priority }, { include: request.include, transaction: t });
    }).then(function () {
      if (!request.order) {
        proposal.upvotes++;
        suggestion.upvotes++;
      } else {
        proposal.orders++;
        suggestion.orders++;
        suggestion.price = ((parseFloat(suggestion.price) + parseFloat(request.order.price)) / 2).toFixed(2);
      }

      return Promise.all([proposal.save({ transaction: t }), suggestion.save({ transaction: t })]);
    }).then(function () {
      response.status(201).json({ message: 'Voted' });
    });
  }).catch(next);
}

function approvalType(request, response, next) {
  if (request.suggQueried.state != 'Pendiente') return response.status(422).json({ error: 'La sugerencia ya fue finalizada' });
  var action = request.url.split('/')[2];
  switch (action) {
    case 'upvote':
      request.action = 'Vote';
      request.order = null;
      request.include = [];
      request.priority = false;
      break;
    case 'orders':
      request.action = 'Order';
      request.order = { price: request.body.price, quantity: request.body.quantity };
      request.include = [{ model: _models2.default.Order, as: 'order' }];
      request.priority = true;
      break;
  }
  delete request.body.quantity;
  delete request.body.price;

  next();
}

function getHistory(request, response, next) {
  var userId = request.params.userId;

  Proposal.findAll({ include: [{ model: Uservote, where: { userId: userId }, attributes: ['userName', 'action'], include: [{ model: _models2.default.Order, as: 'order', attributes: ['quantity', 'price'] }] }, { model: Suggestion, attributes: ['id', 'title', 'edition', 'author', 'isbn', 'state'] }, { model: Course, attributes: ['id', 'code', 'name'] }] }).then(function (proposals) {
    // Assembling the response object
    var rep = proposals.map(function (p) {
      var format = p.Suggestion.dataValues;
      format.subject = p.Course.dataValues;
      format.order = p.Uservotes[0].order;
      return format;
    });

    response.status(200).json(rep);
  }).catch(next);
}

function deleteSuggestions(request, response, next) {
  _models2.default.sequelize.transaction(function (t) {
    return Suggestion.destroy({ where: { state: _defineProperty({}, _models2.default.Sequelize.Op.not, 'Pendiente') }, transaction: t }).then(function () {
      return Uservote.destroy({ where: { ProposalId: null }, transaction: t }).then(function () {
        return Order.destroy({ where: { orderId: null }, transaction: t }).then(function () {
          response.status(204).json();
        });
      });
    });
  }).catch(next);
}

exports.default = { list: list, createSuggestion: createSuggestion, getType: getType, load: load, get: get, approve: approve, approvalType: approvalType, getHistory: getHistory, update: update, deleteSuggestions: deleteSuggestions };