'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.Book; //import the model

var Subject = _models2.default.Subject;
var Author = _models2.default.Author;
var Publisher = _models2.default.Publisher;

function list(request, response, next) {
  var emptyQuery = !Object.keys(request.query).length;
  var filter = emptyQuery ? {} : request.query;
  var order = [];
  var limit = null;

  // TODO: Improve this or do it another way
  // Parses the query received to avoid transforming the non string arguments of the model (edition and catalogued)
  // The order is always descending
  var keys = Object.keys(filter);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] != 'edition' && keys[i] != 'catalogued') {
      if (keys[i] == 'orderBy') {
        order.push([filter[keys[i]], 'DESC']);
        delete filter[keys[i]];
      } else if (keys[i] == 'limit') {
        limit = filter[keys[i]];
        delete filter[keys[i]];
      } else filter[keys[i]] = { $iLike: '%' + filter[keys[i]] + '%' };
    }
  }

  Book.findAll({ where: filter, order: order, limit: limit,
    attributes: ['id', 'isbn', 'title', 'edition', 'authorName', 'publisherName', 'catalogued', 'image'] /*,  include: ['Stock']*/ }).then(function (books) {
    response.status(200).json(books);
  }).catch(next);
}

function create(request, response, next) {
  var book = request.body.book;
  var authors = request.body.authors;
  var publisher = request.body.publisher;
  var newAuthors = request.body.newAuthors;

  // Avoid this
  book.publisherName = publisher.name;

  _models2.default.sequelize.transaction(function (t) {

    var bookCreation = Book.create(book, { transaction: t });
    var publisherPromise = Publisher.findOrCreate({ where: { id: publisher.id }, defaults: { name: publisher.name }, transaction: t });
    var authorsCreation = newAuthors.length === 0 ? [] : Author.bulkCreate(newAuthors, { returning: true, transaction: t });

    var authorsToSet = [];

    return Promise.all([bookCreation, publisherPromise, authorsCreation]).then(function (values) {
      // values[0] is the bookCreation
      // values[2] are all the authors created
      book = values[0];
      publisher = values[1][0]; //Find or create returns an array, first value is the entity

      // TODO: Use async map
      authorsToSet = values[2].map(function (a) {
        return a.id;
      }).concat(authors);

      return Promise.all([book.setPublisher(publisher, { transaction: t }), book.setAuthors(authorsToSet, { transaction: t })]);
    });
  }).then(function (result) {
    response.status(201).json({ id: book.id, title: book.title });
  }).catch(next);
}

// @Params BookId
// @returns Book with Subjects and Categories
function load(request, response, next, id) {

  if (/([^0-9])+/g.test(id)) return response.status(422).json({ error: 'Invalid book id' });

  var emptyQuery = !Object.keys(request.query).length;
  var filter = emptyQuery ? { id: id } : { id: id, catalogued: request.query.catalogued };

  Book.findOne({ where: filter, attributes: { exclude: ['createdAt', 'updatedAt', 'PublisherId'] },
    include: [{ association: 'Subjects', attributes: ['id', 'name'], through: { attributes: [] } }, { association: 'Authors', attributes: ['id', 'name'], through: { attributes: [] } }] }).then(function (book) {
    if (!book) return response.status(404).json({ message: 'Book not found' });
    request.bookQueried = book;
    next();
  }).catch(next);
}

function get(request, response, next) {
  response.status(200).json(request.bookQueried);
}

function getMinimal(request, response, next) {
  var bookId = request.params.minId;
  Book.findOne({ where: { id: bookId }, attributes: ['id', 'title', 'edition'] }).then(function (book) {
    if (!book) return response.status(404).json({ message: 'Book not found' });
    response.status(200).json(book);
  });
}

function destroy(request, response, next) {
  var bookToDelete = request.bookQueried;
  bookToDelete.destroy().then(function () {
    response.status(200).json({ message: 'Deleted' });
  }).catch(next);
}

exports.default = { list: list, create: create, load: load, get: get, destroy: destroy, getMinimal: getMinimal };