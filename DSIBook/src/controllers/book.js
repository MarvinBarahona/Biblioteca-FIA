//import the model
import models from '../models'
const Book = models.Book
const Subject = models.Subject
const Author = models.Author
const Publisher = models.Publisher

function list(request, response, next) {
    const emptyQuery = !Object.keys(request.query).length
    const filter = emptyQuery ? {} : request.query
    let order = []
    let limit = null

    // TODO: Improve this or do it another way
    // Parses the query received to avoid transforming the non string arguments of the model (edition and catalogued)
    // The order is always descending
    const keys = Object.keys(filter)
    for (var i = 0; i < keys.length; i++) {
      if(keys[i]!='edition' && keys[i]!='catalogued'){
        if(keys[i]=='orderBy'){
          order.push([filter[keys[i]], 'DESC'])
          delete filter[keys[i]]
        }
        else if(keys[i]=='limit'){
          limit = filter[keys[i]]
          delete filter[keys[i]]
        }
        else filter[keys[i]] = {$iLike: '%'+filter[keys[i]]+'%'}
      }

    }

    Book.findAll({where: filter, order: order, limit: limit,
      attributes: ['id', 'isbn', 'title', 'edition', 'authorName', 'publisherName', 'catalogued', 'image']/*,  include: ['Stock']*/}).then(books=>{
      response.status(200).json(books)
    }).catch(next)
}

function create(request, response, next) {
  let book = request.body.book
  let authors = request.body.authors
  let publisher = request.body.publisher
  let newAuthors = request.body.newAuthors

  // Avoid this
  book.publisherName = publisher.name

  models.sequelize.transaction(t=>{

    const bookCreation = Book.create(book, {transaction: t})
    const publisherPromise = Publisher.findOrCreate({where: {id: publisher.id}, defaults: {name: publisher.name}, transaction: t})
    const authorsCreation = newAuthors.length===0 ? [] : Author.bulkCreate(newAuthors, {returning: true, transaction: t})

    let authorsToSet = []

    return Promise.all([bookCreation, publisherPromise, authorsCreation]).then(values=>{
      // values[0] is the bookCreation
      // values[2] are all the authors created
      book = values[0]
      publisher = values[1][0] //Find or create returns an array, first value is the entity

      // TODO: Use async map
      authorsToSet = values[2].map(a=>a.id).concat(authors)

      return Promise.all([book.setPublisher(publisher, {transaction: t}), book.setAuthors(authorsToSet, {transaction: t})])
    })

  }).then(result=>{
    response.status(201).json({id: book.id, title: book.title})
  }).catch(next)

}

// @Params BookId
// @returns Book with Subjects and Categories
function load(request, response, next, id) {

  if(/([^0-9])+/g.test(id)) return response.status(422).json({error: 'Invalid book id'})

  const emptyQuery = !Object.keys(request.query).length
  const filter = emptyQuery ? {id: id} : {id: id, catalogued: request.query.catalogued}

  Book.findOne({where: filter, attributes: {exclude: ['createdAt', 'updatedAt', 'PublisherId']}
    ,include: [{association: 'Subjects', attributes:['id', 'name'], through:{attributes: []} },
  {association: 'Authors', attributes:['id', 'name'], through:{attributes: []}}]})
  .then(book=>{
    if(!book) return response.status(404).json({message: 'Book not found'})
    request.bookQueried = book
    next()
  }).catch(next)
}

function get(request, response, next) {
  response.status(200).json(request.bookQueried)
}

function getMinimal(request, response, next) {
  const bookId = request.params.minId
  Book.findOne({where: {id: bookId}, attributes: ['id', 'title', 'edition']}).then(book=>{
    if(!book) return response.status(404).json({message: 'Book not found'})
    response.status(200).json(book)
  })
}

function destroy(request, response, next) {
  let bookToDelete = request.bookQueried
  bookToDelete.destroy().then(()=>{
    response.status(200).json({message: 'Deleted'})
  }).catch(next)
}


export default { list, create, load, get, destroy, getMinimal }
