//import the model
import models from '../models'
const Subject = models.Subject

function list(request, response, next) {
    Subject.findAll({attributes: ['id', 'name']}).then(subjects=>{
      response.status(200).json(subjects)
    }).catch(next)
}

function create(request, response, next) {
  Subject.create(request.body).then(saved=>{
    response.status(201).json(saved)
  }).catch(next)
}

function load(request, response, next, id) {
  Subject.findById(id).then(subject=>{
    if(!subject) response.status(404).json({message: 'Subject not found'})
    request.subjectQueried = subject
    next()
  }).catch(next)
}

function get(request, response, next) {
  response.status(200).json(request.subjectQueried)
}

function update(request, response, next) {
  let subjectToUpdate = request.subjectQueried
  Object.assign(subjectToUpdate, request.body)
  subjectToUpdate.save().then(()=>{
    response.status(200).json({message: 'Updated'})
  }).catch(next)
}

function destroy(request, response, next) {
  let subjectToDelete = request.subjectQueried
  subjectToDelete.destroy().then(()=>{
    response.status(200).json({message: 'Deleted'})
  }).catch(next)
}


export default { list, create, load, get, update, destroy }
