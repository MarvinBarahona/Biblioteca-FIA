import models from '../models'
let Copy = models.Copy
let Transaction = models.Transaction


function list(request, response, next) {
  const empty = !Object.keys(request.query).length
  const filter = empty ? {} : request.query
  Copy.findAll({where: filter, attributes: ['id', 'barcode', 'state', 'bookId']}).then(copies=>{
    response.status(200).json(copies)
  }).catch(next)
}


function byBook(request, response, next) {
  Copy.findAll({where:{bookId: request.params.bookId}, attributes: ['id', 'barcode', 'state']}).then(copies=>{
    response.status(200).json(copies)
  }).catch(next)
}

function lastByBarcode(request, response, next) {
  Copy.findOne({where:{barcode: request.params.barcode}, attributes:['id', 'state', 'barcode'], include:{model: Transaction, as: 'transactions', attributes:['id', 'createdAt', 'type', 'details'],
  through:{attributes:[]}, include:{model: models.Profile, as: 'users', attributes:['userId', 'userName'], through:{attributes:[]}} }})
  .then(copy=>{
    if(!copy) return response.status(404).json({error: 'Copy not found'})
    const transbody = {}
    transbody.copy = {id: copy.id, state: copy.state, barcode: copy.barcode}
    transbody.transaction = copy.transactions.pop()

    response.status(200).json(transbody)
  }).catch(next)
}


function load(request, response, next, id) {
  //Long query, but the execution is quick
  Copy.findOne({where: {id: id}, attributes: ['id', 'barcode', 'state', 'bookId'],
  include: [{model: Transaction, as: 'transactions', attributes: ['id', 'notes', 'single', 'type', 'details', 'createdAt', 'userName'], through: {attributes: []}}]}).then(copy=>{
    if(!copy) return response.status(404).json({error: 'Copy not found'})
    request.copyQueried = copy
    next()
  }).catch(next)
}

function get(request, response, next) {
  response.status(200).json(request.copyQueried)
}

function update(request, response, next) {
  let copyToUp = request.copyQueried

  // Later on this will be another table
  switch (copyToUp.state) {
    case 'Inactivo':
      request.body.state='Disponible'
      break
    case 'Disponible':
      request.body.state='Inactivo'
      break

    default:
      response.status(422).json({message: 'State doesnt meet requirements'})
  }


  Object.assign(copyToUp, request.body)
  copyToUp.save().then(()=>{
     response.status(200).json({message: 'Updated'})
  }).catch(next)
}

function massCataloging(request, response, next) {
  const copies = request.body.copies
  const promises = copies.map(c=>Copy.update({barcode: c.barcode, state: 'Inactivo'}, {where: {id: c.id}}))
  Promise.all(promises).then(values=>{
    response.status(200).json()
  }).catch(next)

}

function getOld(request, response, next) {
  const oneYearBefore = new Date(new Date() - 24*60*60*1000*365)
  Copy.findAll({where: {[models.Sequelize.Op.and]:[{state: {[models.Sequelize.Op.not]: 'Retirado'}}, {updatedAt: {[models.Sequelize.Op.lt]: oneYearBefore}}]}})
  .then(copies=>{
    response.status(200).json(copies)
  }).catch(next)
}
// function destroy(request, response, next) {
//   let copyToDel = request.copyQueried
//    copyToDel.destroy().then(()=>{
//      response.status(200).json({message: 'Deleted'})
//    }).catch(next)
// }


export default { list, load, get, update, massCataloging, byBook, lastByBarcode, getOld }
