import rp from 'request-promise-native'

function create(request, response, next) {
  const options = {
    method: 'POST',
    uri: process.env.USERS_HOST+'users/',
    json: true,
    body: request.body
  }

  rp(options).then(rep=>{
    const info = {userId: rep.user.id, userName: rep.user.fullname, email: rep.user.email}
    const options2 = {
      method: 'POST',
      uri: process.env.TRANS_HOST+'profiles/',
      json: true,
      body: info
    }
    return rp(options2)
  }).then(prof=>{
    response.status(201).json({message: 'User and profile created'})
  }).catch(next)
}

function list(request, response, next) {
  const options = {
    uri: process.env.USERS_HOST+'users/',
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json(rep)
  }).catch(next)
}

function get(request, response, next) {
  // TODO: Review this method, make it more efficient or replace it all together
  const userId = request.params.userId
  const options = {
    uri: process.env.USERS_HOST+'users/'+userId,
    json: true
  }
  const optionsPol = {
    uri: process.env.USERS_HOST+'policies/',
    json: true
  }

  Promise.all([rp(options), rp(optionsPol)]).then(values=>{
    const user = values[0]
    const allpolicies = values[1]

    for (var i = 0; i < allpolicies.length; i++) {
      allpolicies[i].group = false
      let policy = allpolicies[i].code

      if(user.addedPol.includes(policy)){
        allpolicies[i].hasIt=true
      }
      else if(user.groupPol.includes(policy)) {
        allpolicies[i].hasIt= true
        allpolicies[i].group = true
      }
      else allpolicies[i].hasIt=false
    }

    user.Policies = allpolicies

    response.status(200).json(user)

  }).catch(next)
}

function update(request, response, next) {
  const userId = request.params.userId
  const toUpdate = request.body
  const options = {
    method: 'PUT',
    uri: process.env.USERS_HOST+'users/'+userId,
    body: toUpdate,
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json({message: 'Usuario actualizado'})
  }).catch(next)
}

function listGroups(request, response, next) {
  const options = {
    uri: process.env.USERS_HOST+'groups/',
    json: true
  }
  rp(options).then(groups=>{
    response.status(200).json(groups)
  }).catch(next)
}

function setPolicies(request, response, next) {
  const userId = request.params.userId
  const options = {
    method: 'POST',
    uri: process.env.USERS_HOST+'users/'+userId+'/setPolicies',
    json: true,
    body: request.body
  }
  rp(options).then(()=>{
    response.status(200).json({message: 'Policies added'})
  }).catch(next)
}

function remove(request, response, next) {
  const userId = request.params.userId
  const options = {
    method: 'DELETE',
    uri: process.env.USERS_HOST+'users/'+userId,
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json({message: 'Usuario eliminado'})
  }).catch(next)
}



export default { list, get, update, create, remove, listGroups, setPolicies }
