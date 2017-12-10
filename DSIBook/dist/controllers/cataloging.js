'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _models2.default.Book;
var Subject = _models2.default.Subject;

_awsSdk2.default.config.setPromisesDependency(null);
var s3 = new _awsSdk2.default.S3({ region: process.env.REGION, params: { Bucket: process.env.S3_BUCKET } });

function setCataloging(request, response, next) {

  var book = request.bookQueried;

  var subjects = request.body.subjects;
  var newSubjects = request.body.newSubjects;

  delete request.body.subjects;
  delete request.body.newSubjects;

  _models2.default.sequelize.transaction(function (t) {
    // Assembling the promise to create all the new subjects
    var subjectCreation = newSubjects.length === 0 ? [] : Subject.bulkCreate(newSubjects, { returning: true, transaction: t });
    var bookUpdate = Book.update(request.body, { where: { id: book.id }, transaction: t });

    // The merge of new and existing transactions to be associated with the book
    var allSubs = [];

    return Promise.all([subjectCreation, bookUpdate]).then(function (values) {
      // values[0] are the returned subjects, we need this ids
      // TODO: Do array operations with async library or something similar to avoid blocking
      allSubs = values[0].map(function (s) {
        return s.id;
      }).concat(subjects);

      return book.setSubjects(allSubs, { transaction: t });
    });
  }).then(function (value) {
    // All objects associated
    response.status(201).json({ message: 'All data added' });
  }).catch(next);

  // // Assembling the promise to create all the new subjects
  // const subjectCreation = newSubjects.length===0 ? [] : Subject.bulkCreate(newSubjects, {returning: true})
  // const bookUpdate = Book.update({category: request.body.category, authorCode: request.body.authorCode, image: request.awsimage}, {where: {id: book.id}})
  //
  // // The merge of new and existing transactions to be associated with the book
  // let allSubs = []
  //
  // // TODO: Wrap all of this in a sequelize transaction
  // Promise.all([subjectCreation, bookUpdate]).then(values=>{
  //   // values[0] are the returned subjects, we need this ids
  //   // TODO: Do array operations with async library or something similar to avoid blocking
  //   allSubs = values[0].map(s=>s.id).concat(subjects)
  //
  //   return book.setSubjects(allSubs)
  // }).then(value=>{
  //   // All objects associated
  //   response.status(201).json({message: 'All data added'})
  // }).catch(next)
}

function finishCat(request, response, next) {
  var bookToFinish = request.bookQueried;
  // Validate that there is Subjects and Categories
  // if(bookToFinish.Subjects.length===0) return response.status(422).json({error: 'This book is missing subjects'})
  bookToFinish.catalogued = true;
  bookToFinish.save().then(function () {
    response.status(201).json({ message: 'The cataloging is done' });
  }).catch(next);
}

function uploadImg(request, response, next) {

  if (request.bookQueried.catalogued === true) return response.status(422).json({ message: 'The book is already catalogued' });

  var image = request.body.image || '';

  if (!/(^data:image)+/g.test(image)) {
    delete request.body.image;
    return next();
  }

  var imgBuffer = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  var options = {
    Key: 'books-' + request.bookQueried.isbn + '.jpeg',
    Body: imgBuffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };

  s3.putObject(options).promise().then(function (data) {
    var url = 'https://' + process.env.S3_BUCKET + '.s3.amazonaws.com/' + options.Key;
    request.body.image = url;
    next();
  }).catch(next);
}

exports.default = { setCataloging: setCataloging, finishCat: finishCat, uploadImg: uploadImg };