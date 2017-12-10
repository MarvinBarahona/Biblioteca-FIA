//import the needed models
import models from '../models' //Importing the models index
let User = models.User
import crypto from 'crypto'
import mailer from '../config/mailer'
import jwt from '../config/jwt'


function list(request, response, next) {
  const query = request.query.all
  const emptyQuery = !Object.keys(request.query).length
  const groupFilter = emptyQuery ? {[models.Sequelize.Op.or]: [{id: 1}, {id: 2}, {id: 4}]} : {}

  User.findAll({attributes: ['id', 'email', 'fullname'], include: [{association: 'Group', attributes: ['name'], where: groupFilter }]}).then(users => {
      response.status(200).json(users)
  }).catch(next)
}

function create(request, response, next) {    //We'll implement bcrypt in the usermodel
  let password = crypto.randomBytes(64).toString('hex')
    User.create({
      email: request.body.email,
      password: password,
      fullname: request.body.fullname
    }).then(saved=>{
      //Generate a jwt and send it in a token
      return jwt.sign({user_id: saved.id, user_email: saved.email}, saved.password)
      .then(token=>{
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: saved.email,
          subject: 'Establece una contraseña', //Maybe import this configuration from enviroment or file provided by the enviroment
          html: '<h1>Cambia tu contraseña haciendo click en el link abajo: </h1> <h2>'+process.env.FRONT_HOST+saved.id+'/'+token+'</h2>' //Importing the html migth also work
        }
        return Promise.all([mailer.sendMail(mailOptions), saved.setGroup(request.body.group)])
      })
      .then(info=>{
        response.status(201).json({message: 'Verification email sent', user: saved})
      })
    }).catch(next)
}


function load (request, response, next, id) {
  // Validation of the integer with a regex
  if(/([^0-9])+/g.test(id)) return response.status(422).json({error: 'Invalid user id'})
  User.findOne({where: {id: id}, include: [{association: 'Group', include: ['Policies']}, 'Policies']}).then(user=>{
    if(user){
      request.userQueried = user
      next()
    } else {
      response.status(400).json({message: 'User not found'})
    }
  }).catch(next)
}

//If an error ocurrs in any of the functions we can define a next parameter, which represents the middleware that will handle this errors
//We'll ignore that for now so we'll just use request and response
function get(request, response) {
   const userToShow = request.userQueried.detailPolicies()
   response.status(200).json(userToShow);
}

function update(request, response, next) {
     let user = request.userQueried
     Object.assign(user, request.body)  //Nice function to just replace the properties of the object listed, just send the email on the body and it will change
     user.save().then(()=>{
       response.status(200).json({message: 'Updated'})
     }).catch(next)
}

function destroy(request, response, next) {
    let user = request.userQueried
    user.destroy().then(()=>{
      response.status(200).json({message: 'Deleted'})
    }).catch(next)
}

function addToGroup(request, response, next) {
  let user = request.userQueried
  user.setGroup(request.params.groupId).then(()=>{
    response.status(201).json({message: 'User added to group'})
  }).catch(next)
}

function removeFromGroup(request, response, next) {
  let user = request.userQueried
  user.setGroup(null).then(()=>{ //There must be a better way but the documentation sucks
    response.status(201).json({message: 'User removed from group'})
  }).catch(next)
}

// function addPolicies(request, response, next) {
//   const policies = request.body.policies
//   //Creating the array of promises
//   //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//   const promises = policies.map(pol => request.userQueried.addPolicy(pol))
//
//   //Executing all promises in parallel so theres no I/O block and resolves when all promises in the array resolves
//   //See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
//   Promise.all(promises).then(values=>{
//     response.status(201).json({message: 'Policies added'})
//   }).catch(next)
//
// }
//
// function removePolicies(request, response, next) {
//   const policies = request.body.policies
//   //Creating the array of promises
//   //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//   const promises = policies.map(pol => request.userQueried.removePolicy(pol))
//   //Executing all promises in parallel so theres no I/O block and resolves when all promises in the array resolves
//   //See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
//   Promise.all(promises).then(values=>{
//     response.status(201).json({message: 'Policies removed'})
//   }).catch(next)
//
// }

function setPolicies(request, response, next) {
  const policies = request.body.policies
  // Validate existing ones
  const gPol = request.userQueried.Group.Policies.map(p=>p.id)


  const pol = policies.filter(p=> !gPol.includes(p))


  request.userQueried.setPolicies(pol).then(()=>{
    response.status(201).json({message: 'Policies set'})
  }).catch(next)
}

function validateIdentity(request, response, next) {
  if(request.user.email === request.userQueried.email){
    next()
  } else{
    response.status(403).json({error: 'You are not authorized to change this user'})
  }
}

function checkPass(request, response, next) {
  User.findOne({where: {email: request.body.email}, include: [{association: 'Group', include: ['Policies']}, 'Policies']}).then(user=>{
    if(!user) return response.status(404).json({message: 'User not found'})
    return user.checkPassword(request.body.password).then(isMatch=>{
        if(isMatch){
          response.status(200).json(user.parseUser())

        } else return response.status(401).json({message: 'Incorrect password'})
      })
  }).catch(next)
}

export default { list, create, load, get, update, destroy, addToGroup, removeFromGroup, setPolicies, validateIdentity, checkPass }
