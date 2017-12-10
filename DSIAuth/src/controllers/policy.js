import models from '../models'
let Policy = models.Policy

function list(request, response, next) {
  Policy.findAll({attributes: ['id', 'name', 'code']}).then(policies=>{
      response.status(200).json(policies)
  }).catch(next)
}

function create(request, response, next) {
  const policy = request.body
  Policy.findOrCreate({where: {name: policy.name}, defaults: {code: policy.code}}).spread((policy, created)=>{ //created its a flag that indicated the row creation
    if(!created){
      response.status(422).json({error: 'Policy already exists'})
    } else{
      response.status(201).json(policy)
    }
  }).catch(next)
}

function load(request, response, next, id) {
  // Validation of the integer with a regex
  if(/([^0-9])+/g.test(id)) return response.status(422).json({error: 'Invalid user id'})
  Policy.findById(id).then(policy=>{
    if(policy){
      request.policyQueried = policy
      next()
    } else {
      response.status(404).json({error: 'Policy not found'})
    }
  }).catch(next)
}

function get(request, response) {
  response.status(200).json(request.policyQueried)
}

function update(request, response, next) {
  let policy = request.policyQueried
  Object.assign(policy, request.body)
  policy.save().then(()=>{
    response.status(200).json({message: 'Changes saved'})
  }).catch(next)
}

function destroy(request, response, next) {
  //We are deleting now, in the future we can make it so its moved to a table
  let policy = request.policyQueried
  policy.destroy().then(()=>{
    response.status(200).json({message: 'Object deleted'})
  }).catch(next)
}

export default { list, create, load, get, update, destroy }
