import rp from 'request-promise-native'

function list(request, response, next) {
  const values = request.url.split('?')
  const filter = values.length==1 ? '' : values[1]

  const options = {
    uri: process.env.SUGGS_HOST+'suggestions?'+filter,
    json: true
  }

  rp(options).then(suggestions=>{
    response.status(200).json(suggestions)
  }).catch(next)

}

function get(request, response, next) {

  const suggId = request.params.suggId
  const options = {
    uri: process.env.SUGGS_HOST+'suggestions/'+suggId,
    json: true
  }

  rp(options).then(suggestion=>{
    response.status(200).json(suggestion)
  }).catch(next)
}

function update(request, response, next) {
  const suggId = request.params.suggId
  const options = {
    method: 'PUT',
    body: request.body,
    uri: process.env.SUGGS_HOST+'suggestions/'+suggId,
    json: true
  }

  rp(options).then(suggestion=>{
    response.status(200).json(suggestion)
  }).catch(next)
}

function create(request, response, next) {
  request.body.userId = request.user.id
  request.body.userName = request.user.fullname
  const options = {
    method: 'POST',
    uri: '',
    json: true,
    body: request.body
  }

  switch (request.url) {
    case '/student':
      options.uri = process.env.SUGGS_HOST+'suggestions/student'
      break
    case '/teacher':
      options.uri = process.env.SUGGS_HOST+'suggestions/teacher'
      break
    default:
        return response.status(400).json()
  }

  rp(options).then(suggestion=>{
    response.status(201).json(suggestion)
  }).catch(next)
}

function upvote(request, response, next) {

  const suggId = request.params.suggId
  request.body.userId = request.user.id
  request.body.userName = request.user.fullname
  const options = {
    method: 'POST',
    uri: process.env.SUGGS_HOST+'suggestions/'+suggId+'/upvote',
    json: true,
    body: request.body
  }

  rp(options).then(suggestion=>{
    response.status(201).json(suggestion)
  }).catch(next)
}

function order(request, response, next) {
  const suggId = request.params.suggId
  request.body.userId = request.user.id
  request.body.userName = request.user.fullname
  const options = {
    method: 'POST',
    uri: process.env.SUGGS_HOST+'suggestions/'+suggId+'/orders',
    json: true,
    body: request.body
  }

  rp(options).then(suggestion=>{
    response.status(201).json(suggestion)
  }).catch(next)
}

function listMajors(request, response, next) {
  const options = {
    uri: process.env.SUGGS_HOST+'majors',
    json: true
  }
  rp(options).then(majors=>{
    response.status(200).json(majors)
  }).catch(next)
}

function history(request, response, next) {
  const userId = request.params.userId
  const options = {
    method: 'GET',
    uri: process.env.SUGGS_HOST+'suggestions/user/'+userId,
    json: true
  }
  rp(options).then(history=>{
    response.status(200).json(history)
  }).catch(next)
}

function changePeriod(request, response, next) {
  const options = {
    method: 'DELETE',
    uri: process.env.SUGGS_HOST+'suggestions/periods',
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json()
  }).catch(next)
}



export default { list, get, create, upvote, order, history, listMajors, update, changePeriod }
