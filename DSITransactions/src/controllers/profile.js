import models from '../models'
const Profile = models.Profile

function create(request, response, next) {
  Profile.create(request.body).then(profile=>{
    response.status(201).json({msg: 'Profile created', username: profile.userName})
  }).catch(next)
}

function list(request, response, next) {
  Profile.findAll({attributes: ['userId', 'userName', 'email', 'penalized']}).then(users=>{
    response.status(200).json(users)
  }).catch(next)
}

function massUpdate(request, response, next) {
  const promises = request.body.map(u=>Profile.update({email: u.email}, {where: {userId: u.id}}))
  Promise.all(promises).then(values=>{
    response.status(200).json({message: 'All updated'})
  }).catch(next)
}

function update(request, response, next) {
  const profId = request.params.profId
  Profile.findById(profId).then(profile=>{
    if(!profile) return response.status(404).json({message: 'El perfil no existe'})
    Object.assign(profile, request.body)
    return profile.save().then(()=>{
      response.status(200).json(profile)
    })
  }).catch(next)
}

export default { create, list, massUpdate, update }
