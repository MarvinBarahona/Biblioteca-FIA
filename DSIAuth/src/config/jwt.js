// Try to do this with bluebird instead and maybe add a regex for removing the Async sufix provided by bluebird

import jwt from 'jsonwebtoken'

function verify(tokenP, secretP) {
  return new Promise((resolve, reject)=>{
    jwt.verify(tokenP, secretP, function(err, decoded) {
      if(err) reject(err)
      resolve(decoded)
    })
  })
}

function sign(payloadP, secretP, jwtDataP) {
  return new Promise((resolve, reject)=>{
    jwt.sign(payloadP, secretP, jwtDataP, function(err, token) {
      if(err) reject(err)
      resolve(token)
    })
  })
}

export default { verify, sign }
