import models from '../models'
let Group = models.Group

function list(request, response, next) {
  Group.findAll({attributes: ['id', 'name']}).then(groups=>{
      response.status(200).json(groups)
  }).catch(next)
}

function create(request, response, next) {
  const group = request.body
  Group.findOrCreate({where: {name: group.name}, defaults: {code: group.code}}).spread((group, created)=>{ //created its a flag that indicated the row creation
    if(!created){
      response.status(422).json({error: 'Group already exists'})
    } else{
      response.status(201).json(group)
    }
  }).catch(next)
}

function load(request, response, next, id) {
  // Validation of the integer with a regex
  if(/([^0-9])+/g.test(id)) return response.status(422).json({error: 'Invalid user id'})
  Group.findById(id).then(group=>{
    if(group){
      request.groupQueried = group
      next()
    } else {
      response.status(404).json({error: 'Group not found'})
    }
  }).catch(next)
}

function get(request, response) {
  response.status(200).json(request.groupQueried)
}

function update(request, response, next) {
  let group = request.groupQueried
  Object.assign(group, request.body)
  group.save().then(()=>{
    response.status(200).json({message: 'Changes saved'})
  }).catch(next)
}

function destroy(request, response, next) {
  //We are deleting now, in the future we can make it so its moved to a table
  let group = request.groupQueried
  group.destroy().then(()=>{
    response.status(200).json({message: 'Object deleted'})
  }).catch(next)
}

function addPolicies(request, response, next) {
  const policies = request.body.policies
  const promises = policies.map(pol => request.groupQueried.addPolicy(pol))
  Promise.all(promises).then(values=>{
    response.status(201).json({message: 'Policies added to group'})
  }).catch(next)
}

function removePolicies(request, response, next) {
  const policies = request.body.policies
  const promises = policies.map(pol => request.groupQueried.removePolicy(pol))
  Promise.all(promises).then(values=>{
    response.status(201).json({message: 'Policies removed from group'})
  }).catch(next)
}



export default { list, create, load, get, update, destroy, addPolicies, removePolicies }
