// import jwt from 'jsonwebtoken'
import jwt from '../config/jwt'
import models from '../models' //Importing the models index
let User = models.User
let Group = models.Group
import mailer from '../config/mailer'


function authenticate(request, response, next) {
  User.findOne({where: {email: request.body.email}, include: [{association: 'Group', include: ['Policies']}, 'Policies']}).then(user=>{
    if(!user) return response.status(404).json({message: 'User not found'})
    return user.checkPassword(request.body.password).then(isMatch=>{
        if(isMatch){
          //Destructuring property could be applied of the object was more complex
          //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
          // request.user = (({id, email})=>({id, email}))(user)
          //Change this for something better with object literals
          request.user = user.parseUser()
          next()
        } else return response.status(401).json({message: 'Incorrect password'})
      })
  }).catch(next)
}


//With promises
function generateToken(request, response, next) {
  const secret = process.env.JWT_SECRET
  const expireTime = process.env.JWT_EXPIRATION
  const payload = {user_id: request.user.id, user_email: request.user.email}
  const jwtData = {expiresIn: expireTime}
  //Creating the token
  jwt.sign(payload, secret, jwtData).then(token=>{
    response.status(200).json({token: token, user: request.user})
  }).catch(next)
}

//With promises
function checkToken(request, response, next) {
  const token = request.params.token || request.get('Authorization')
  const secret = process.env.JWT_SECRET
  if(!token || token==='null') return response.status(401).json({error: 'No token'})
  else{
    jwt.verify(token, secret).then(decoded=>{
      return User.findOne({where: {id: decoded.user_id}, include: [{association: 'Group', include: ['Policies']}, 'Policies']}).then(user=>{
        if(!user) response.status(404).json({error: 'Account does not longer exists'})
        if(decoded.user_email === user.email){
          request.user = user.parseUser()
          next()
        } else {
          response.status(401).json({status: 'Email changed, request new token this one must be deleted'})
        }
      })
    }).catch(next)
  }

}

function showDecodedToken(request, response) {
    const body = request.user
    response.status(200).json(body)
}

//With promises
function changePassword(request, response, next) {
  const token = request.body.token
  const userId = request.body.userId

  User.findById(userId).then(body=>{
    if(!body) return response.status(404).json({error: 'User does not longer exist'})
    return jwt.verify(token, body.password).then(decoded=>{
      const newPassword = request.body.password
      body.password = newPassword
      return body.save()
    }).then(()=>{
      response.status(200).json({message: 'Updated password'})
    })
  }).catch(next)
}

//With promises
function requestPassChange(request, response, next) {
  //Current user is in request.user so just send the email with that data
  const userEmail = request.body.email
  User.findOne({where: {email: userEmail}}).then(userFound=>{
    if(!userFound) return response.status(404).json({error: 'No user with that email'})
    const userSecret = userFound.password
    return jwt.sign({user_email: userEmail}, userSecret).then(token=>{
      let mailOptions = {
        from: process.env.GMAIL_USER,
        to: userEmail,
        subject: 'Cambia tu contraseña',
        html: '<h1>Cambia tu contraseña haciendo click en el link abajo: </h1> <h2>'+process.env.FRONT_HOST+userFound.id+'/'+token+'</h2>'
      }

      return mailer.sendMail(mailOptions)
    }).then(info=>{
      //The mail was sent
      response.status(200).json({message: 'Email sent'})
    })

  }).catch(next)
}

function externalAccount(request, response, next) {
  User.findOrCreate({where: {email: request.body.email}, defaults:{fullname: request.body.fullname, password: 'Not saved'}, include: [{association: 'Group', include: ['Policies']}] })
  .spread((user, created)=>{
    if(!created) return response.status(200).json({user: user.parseUser(), new: false})
    return Group.findOne({where: {name: request.body.group}, include: ['Policies']})
    .then(group=>{
      return user.setGroup(group.id).then(user=>{
        user.Group = group
        response.status(201).json({user: user.parseUser(), new: true})
      })
    })
  }).catch(next)
}


export default { authenticate, generateToken, checkToken, changePassword, requestPassChange, showDecodedToken, externalAccount }
