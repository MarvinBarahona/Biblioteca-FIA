import models from '../models'
const Author = models.Author
const Publisher = models.Publisher


function list(request, response, next) {
    Author.findAll({attributes: ['id', 'name']}).then(authors=>{
      response.status(200).json(authors)
    }).catch(next)
}

function create(request, response, next) {
  Author.create(request.body).then(saved=>{
    response.status(201).json(saved)
  }).catch(next)
}

function load(request, response, next, id) {
  if(/([^0-9])+/g.test(id)) return response.status(422).json({error: 'Invalid author id'})
  Author.findById(id).then(author=>{
    if(!author) response.status(404).json({message: 'Author not found'})
    request.authorQueried = author
    next()
  }).catch(next)
}

function get(request, response, next) {
  response.status(200).json(request.authorQueried)
}

function update(request, response, next) {
  let authorToUpdate = request.authorQueried
  Object.assign(authorToUpdate, request.body)
  authorToUpdate.save().then(()=>{
    response.status(200).json({message: 'Updated'})
  }).catch(next)
}

function destroy(request, response, next) {
  let authorToDelete = request.authorQueried
  authorToDelete.destroy().then(()=>{
    response.status(200).json({message: 'Deleted'})
  }).catch(next)
}

function getAuthoPub(request, response, next) {
  const authors = Author.findAll({attributes: ['id', 'name']})
  const publishers = Publisher.findAll({attributes: ['id', 'name']})
  Promise.all([authors, publishers]).then(values=>{
    response.status(200).json({authors: values[0], publishers: values[1]})
  }).catch(next)
}


export default { list, create, load, get, update, destroy, getAuthoPub }
