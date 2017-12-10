//A wrapper for google authentication service, so the code remains consistent and we are able to chain the promises to do further work

import GoogleAuth from 'google-auth-library'
const auth = new GoogleAuth()

//TO DO: Check if dotenv is working in here

const client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, '', '')

function verifyIdToken(tokenPassed) {
  return new Promise((resolve, reject)=>{
    client.verifyIdToken(tokenPassed, process.env.GOOGLE_CLIENT_ID, function(e, login) {
      if (e) return reject(e)
      const payload = login.getPayload()
      resolve(payload)
    })
  })
}

export default { verifyIdToken }
