import models from '../models'
import validations from '../validations/suggestion'
const Suggestion = models.Suggestion
const Uservote = models.Uservote
const Proposal = models.Proposal
const Course = models.Course
const Order = models.Order


function list(request, response, next) {
    const emptyQuery = !Object.keys(request.query).length
    const limitQuery = emptyQuery ? null : 10
    const filter = emptyQuery ? {} : request.query
    const keys = Object.keys(filter)
    let order = []

    const suggFilter = {}

    for (var i = 0; i < keys.length; i++) {
     if(keys[i]!='code' && keys[i]!='name'){
       if(keys[i]!='state' && keys[i]!='orderBy') filter[keys[i]] = {$iLike: '%'+filter[keys[i]]+'%'}
       if(keys[i]=='orderBy'){
         order.push([filter[keys[i]], 'DESC'])
         delete filter[keys[i]]
       }
     }
     else {
       suggFilter[keys[i]] = {$iLike: '%'+filter[keys[i]]+'%'}
       delete filter[keys[i]]
     }
    }

    Suggestion.findAll({where: filter, order:order, limit: limitQuery, attributes: ['id', 'title', 'edition', 'author', 'isbn', 'price', 'state', 'upvotes', 'orders', 'quantity', 'reason'],
    include: [{where: suggFilter, association: 'Courses', attributes:['code','name'], through: {attributes: []}}]
    }).then(results=>{
      response.status(200).json(results)
    }).catch(next)

}

function createSuggestion(request, response, next) {
    const suggestion = request.suggestion

    models.sequelize.transaction(t=>{

      return Suggestion.findOrCreate({where: {isbn: suggestion.isbn}, defaults: suggestion, transaction: t}).spread((sugg, created)=>{
        if(!created) return response.status(422).json({saved: false, suggestionId: sugg.id})
        return sugg.addCourse(request.body.subjectId, {through: request.through, returning: true, transaction: t}).then(prop=>{
          const realProp = prop[0][0]
          const propProm = realProp.createUservote({userId: request.body.userId, userName: request.body.userName, action: 'Creation', order: request.order, priority: request.priority}, {transaction: t, include: request.include})

          switch (request.userType) {
            case 'student':
              sugg.upvotes++
              break
            case 'teacher':
              sugg.orders++
              break
          }

          return Promise.all([propProm, sugg.save({transaction: t})]).then(value=>{
            response.status(201).json({saved: true})
          })
        })
      })
    }).catch(next)
}

function getType(request, response, next) {

  var errors= validations.createSuggestValidation(request)

  if (errors) {
    response.send(errors)
    return
  }else {
    switch (request.url) {
      case '/student':
        request.include = []
        request.order = {}
        request.through = {upvotes: 1}
        request.userType = 'student'
        request.priority = false
        break
      case '/teacher':
        request.include = [{model: models.Order, as: 'order'}]
        request.order = {price: request.body.price, quantity: request.body.quantity}
        request.through = {orders: 1}
        request.userType = 'teacher'
        request.priority = true
        break
    }

    const suggestion = Object.assign({}, request.body)
    delete suggestion.subjectId
    delete suggestion.userId
    delete suggestion.userName
    delete suggestion.quantity

    request.suggestion = suggestion
    next()
  }


}

function load(request, response, next, id) {
  if(/([^0-9])+/g.test(id)) return response.status(422).json({error: 'Invalid suggestion id'})
  Suggestion.findOne({where: {id: id}, attributes:['id', 'title', 'edition', 'author', 'isbn', 'publisher', 'price', 'state', 'upvotes', 'orders', 'quantity', 'reason'],
  include: [{association: 'Courses', attributes: ['id', 'name'], through:{attributes:['id', 'upvotes', 'orders']}}]})
  .then(sugg=>{
    if(!sugg) return response.status(404).json({message: 'No suggestion with that id'})
    request.suggQueried = sugg
    next()
  }).catch(next)
}

function get(request, response, next) {
  // Run a promise all to gather all the user votes from the proposal
  const promises = []
  for (var i = 0; i < request.suggQueried.Courses.length; i++) {
    let prop = request.suggQueried.Courses[i].Proposal
    promises.push(prop.getUservotes({attributes: ['userId', 'userName', 'priority']}))
  }

  Promise.all(promises).then(votes=>{
    const formated = request.suggQueried.formatCourses(votes)
    response.status(200).json(formated)
  }).catch(next)

}

function update(request, response, next) {
  const suggestion = request.suggQueried
  if(suggestion.state != 'Pendiente') return response.status(422).json({error: 'La sugerencia ya fue finalizada'})
  Object.assign(suggestion, request.body)
  suggestion.save().then(()=>{
    response.status(200).json(suggestion)
  }).catch(next)
}

function approve(request, response, next) {
  const suggestion = request.suggQueried
  const course = suggestion.Courses.filter(c => c.id === parseInt(request.body.subjectId))
  let newSubject = false

  let proposal = {}

  if(!course[0]) newSubject = true
  else proposal = course[0].Proposal

  models.sequelize.transaction(t=>{

    return suggestion.addCourse(request.body.subjectId, {returning: true, transaction: t}).then(value=>{
      if(value.length!=0) proposal = value[0][0]
      return proposal.createUservote({userId: request.body.userId, userName: request.body.userName, action: request.action, order: request.order, priority: request.priority},
      {include: request.include, transaction: t})
    }).then(()=>{
      if(!request.order){
        proposal.upvotes++
        suggestion.upvotes++
      }
      else{
        proposal.orders++
        suggestion.orders++
        suggestion.price = ((parseFloat(suggestion.price)+parseFloat(request.order.price))/2).toFixed(2)
      }

      return Promise.all([proposal.save({transaction: t}), suggestion.save({transaction: t})])
    }).then(()=>{
       response.status(201).json({message: 'Voted'})
    })

  }).catch(next)



}

function approvalType(request, response, next) {
  if(request.suggQueried.state != 'Pendiente') return response.status(422).json({error: 'La sugerencia ya fue finalizada'})
  const action = request.url.split('/')[2]
  switch (action) {
    case 'upvote':
      request.action = 'Vote'
      request.order = null
      request.include = []
      request.priority = false
      break
    case 'orders':
      request.action = 'Order'
      request.order = {price: request.body.price, quantity: request.body.quantity}
      request.include = [{model: models.Order, as: 'order'}]
      request.priority = true
      break
  }
  delete request.body.quantity
  delete request.body.price

  next()
}

function getHistory(request, response, next) {
  const userId = request.params.userId

  Proposal.findAll({include:[{model: Uservote, where:{userId: userId}, attributes:['userName', 'action'], include:[{model: models.Order, as: 'order', attributes:['quantity', 'price']}]},
  {model: Suggestion, attributes:['id', 'title', 'edition', 'author', 'isbn', 'state']}, {model: Course, attributes:['id', 'code', 'name']} ]})
  .then(proposals=>{
      // Assembling the response object
      const rep = proposals.map(function(p) {
        const format = p.Suggestion.dataValues
        format.subject = p.Course.dataValues
        format.order = p.Uservotes[0].order
        return format
      })

      response.status(200).json(rep)

  }).catch(next)
}

function deleteSuggestions(request, response, next) {
  models.sequelize.transaction(t=>{
    return Suggestion.destroy({where: {state: {[models.Sequelize.Op.not]: 'Pendiente'}}, transaction: t}).then(()=>{
      return Uservote.destroy({where: {ProposalId: null}, transaction: t}).then(()=>{
        return Order.destroy({where: {orderId: null}, transaction: t}).then(()=>{
          response.status(204).json()
        })
      })
    })
  }).catch(next)

}

export default { list, createSuggestion, getType, load, get, approve, approvalType, getHistory, update, deleteSuggestions }
