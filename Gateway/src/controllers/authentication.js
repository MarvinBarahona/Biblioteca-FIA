// import dotenv from 'dotenv'
// dotenv.config()
import jwt from '../config/jwt'
import GoogleAuth from '../config/googleAuth'
import rp from 'request-promise-native'

function authenticate(request, response, next) {
  const email = request.body.email
  const password = request.body.password

  const options = {
    method: 'POST',
    uri: process.env.USERS_HOST+'users/checkPass',
    body: {email: email, password: password },
    json: true
  }

  rp(options).then(rep=>{
    request.user = rep
    next()
  }).catch(next)
}

function generateToken(request, response, next) {
  const secret = process.env.JWT_SECRET
  const expireTime = process.env.JWT_EXPIRATION
  const payload = {id: request.user.id, email: request.user.email, fullname: request.user.fullname, Group: request.user.Group, Policies: request.user.Policies}
  const jwtData = {expiresIn: expireTime}
  //Creating the token
  jwt.sign(payload, secret, jwtData).then(token=>{
    response.status(200).json({token: token, user: request.user})
  }).catch(next)
}

function checkToken(request, response, next) {
  const token = request.params.token || request.get('Authorization')
  const secret = process.env.JWT_SECRET
  if(!token || token==='null') return response.status(401).json({error: 'No token'})
  else{
    jwt.verify(token, secret).then(decoded=>{
      request.user = {id: decoded.id, email: decoded.email, fullname: decoded.fullname, Group: decoded.Group, Policies: decoded.Policies}
      next()
    }).catch(next)
  }
}

function showDecodedToken(request, response) {
    const body = request.user
    response.status(200).json(body)
}

function changePassword(request, response, next) {
  const options = {
    method: 'POST',
    uri: process.env.USERS_HOST+'auth/change_password',
    body: request.body,
    json: true
  }

  rp(options).then(rep=>{
    response.status(200).json({message: 'Password changed succesfully'})
  }).catch(next)
}

function requestPass(request, response, next) {
  const email = request.body.email
  const options = {
    method: 'POST',
    uri: process.env.USERS_HOST+'auth/request_password',
    body: {email: email },
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json({message: 'Check your email'})
  }).catch(next)
}

function verifyGoogle(request, response, next) {
  const gToken = request.body.token
  if(!gToken || gToken==='') return response.status(401).json({error: 'No token'})

  GoogleAuth.verifyIdToken(gToken).then(payload=>{
    // Check for the existence of a payload['hd'], it has to be in every UES account

    if(process.env.UESCHECK) if(!payload['hd'] || payload['hd']!='ues.edu.sv') return response.status(401).json({message: 'Not a UES member'})
    const body = {email: payload['email'], fullname: payload['name']}

    if(body.email.split('@')[0].length == 7) body.group='Estudiante'
    else body.group = 'Docente'
    return rp({method: 'POST', uri: process.env.USERS_HOST+'auth/create_account', body: body, json: true})
    .then(rep=>{
      request.user = rep.user
      if(!rep.new) return next()

      const info = {userId: rep.user.id, userName: rep.user.fullname, email: rep.user.email}
      console.log(info);
      const options = {method: 'POST', uri: process.env.TRANS_HOST+'profiles/', json: true, body: info }

      return rp(options).then(values=>{
        next()
      })
    })
  }).catch(next)
}

export default { authenticate, generateToken, checkToken, showDecodedToken, changePassword, requestPass, verifyGoogle }
