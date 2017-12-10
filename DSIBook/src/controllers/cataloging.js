import AWS from 'aws-sdk'
import models from '../models'
const Book = models.Book
const Subject = models.Subject

AWS.config.setPromisesDependency(null)
const s3 = new AWS.S3({region: process.env.REGION, params:{Bucket: process.env.S3_BUCKET}})


function setCataloging(request, response, next) {

  const book = request.bookQueried

  const subjects = request.body.subjects
  const newSubjects = request.body.newSubjects

  delete request.body.subjects
  delete request.body.newSubjects

  models.sequelize.transaction(t=>{
    // Assembling the promise to create all the new subjects
    const subjectCreation = newSubjects.length===0 ? [] : Subject.bulkCreate(newSubjects, {returning: true, transaction: t})
    const bookUpdate = Book.update(request.body, {where: {id: book.id}, transaction: t})

    // The merge of new and existing transactions to be associated with the book
    let allSubs = []

    return Promise.all([subjectCreation, bookUpdate]).then(values=>{
      // values[0] are the returned subjects, we need this ids
      // TODO: Do array operations with async library or something similar to avoid blocking
      allSubs = values[0].map(s=>s.id).concat(subjects)

      return book.setSubjects(allSubs, {transaction: t})
    })
  }).then(value=>{
    // All objects associated
    response.status(201).json({message: 'All data added'})
  }).catch(next)

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
  let bookToFinish = request.bookQueried
// Validate that there is Subjects and Categories
  // if(bookToFinish.Subjects.length===0) return response.status(422).json({error: 'This book is missing subjects'})
  bookToFinish.catalogued=true
  bookToFinish.save().then(()=>{
    response.status(201).json({message: 'The cataloging is done'})
  }).catch(next)
}

function uploadImg(request, response, next) {

  if(request.bookQueried.catalogued===true) return response.status(422).json({message: 'The book is already catalogued'})

  const image = request.body.image || ''

  if(!/(^data:image)+/g.test(image)){
    delete request.body.image
    return next()
  }

  const imgBuffer = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const options = {
    Key: 'books-'+request.bookQueried.isbn+'.jpeg',
    Body: imgBuffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  }

  s3.putObject(options).promise().then(data=>{
      const url = 'https://'+process.env.S3_BUCKET+'.s3.amazonaws.com/'+options.Key
      request.body.image = url
      next()
  }).catch(next)
}

export default { setCataloging, finishCat, uploadImg }
