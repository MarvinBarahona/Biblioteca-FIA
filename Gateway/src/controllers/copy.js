import rp from 'request-promise-native'

function list(request, response, next) {
  const options = {
    uri: process.env.TRANS_HOST+'copies/',
    json: true
  }
  rp(options).then(copies=>{
    response.status(200).json(copies)
  }).catch(next)
}

function get(request, response, next) {
  const copyId = request.params.copyId
  const options1 = {
    uri: process.env.TRANS_HOST+'copies/'+copyId,
    json: true
  }
  let copyToShow = {}
  rp(options1).then(copy=>{
    copyToShow = copy
    const options2 = {
      uri: process.env.BOOKS_HOST+'books/minimal/'+copy.bookId,
      json: true
    }
    return rp(options2)
  }).then(book=>{
    delete copyToShow.bookId
    response.status(200).json({copy: copyToShow, book: book})
  }).catch(next)
}

function getByBarcode(request, response, next) {
  const barcode = request.params.barcode
  let query = 'copies?barcode='+barcode
  if(request.query.inactive==='1') query=query.concat('&state=Inactivo')

  const options = {
    uri: process.env.TRANS_HOST+query,
    json: true
  }

  let copyBarcode = {}
  rp(options).then(copies=>{
    if(copies.length===0) return response.status(200).json({message: 'Sin resultados'})

    const options2 = {
      uri: process.env.BOOKS_HOST+'books/minimal/'+copies[0].bookId,
      json: true
    }

    delete copies[0].bookId
    copyBarcode = copies[0]
    return rp(options2).then(book=>{
      response.status(200).json({copy: copyBarcode, book: book})
    })
  }).catch(next)
}

function lastByBarcode(request, response, next) {
  const barcode = request.params.barcode
  const options = {
    uri: process.env.TRANS_HOST+'copies/'+barcode+'/transaction',
    json: true
  }
  rp(options).then(copy=>{
    response.status(200).json(copy)
  }).catch(next)
}

function getLots(request, response, next) {
  let promises = []

  switch (request.query.type) {
    case '1':
      promises.push(rp({uri: process.env.TRANS_HOST+'transactions?type=Compra', json: true}),
      rp({uri: process.env.TRANS_HOST+'transactions?type=Donación', json: true}))
      break

    case '2':
      promises.push(rp({uri: process.env.TRANS_HOST+'transactions?type=Salida', json: true}))
      break

    case '3':
      promises.push(rp({uri: process.env.TRANS_HOST+'transactions?type=Reservación', json: true}))
      break
    case '4':
      promises.push(rp({uri: process.env.TRANS_HOST+'transactions?type=Daño', json: true}),
      rp({uri: process.env.TRANS_HOST+'transactions?type=Extravío', json: true}))
      break

    case '5':
      promises.push(rp({uri: process.env.TRANS_HOST+'transactions?type=Descarte', json: true}))
      break

    default:
    promises.push(rp({
      uri: process.env.TRANS_HOST+'transactions?single=0',
      json: true
    }))
  }

  Promise.all(promises).then(trans=>{
    response.status(200).json(trans)
  }).catch(next)
}

function massCatalog(request, response, next) {
  const options = {
    method: 'POST',
    body: request.body,
    uri: process.env.TRANS_HOST+'copies/massCataloging',
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json(rep)
  }).catch(next)
}

function putState(request, response, next) {
  const copyId = request.params.copyId
  const options = {
    method: 'PUT',
    body: {},
    uri: process.env.TRANS_HOST+'copies/'+copyId,
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json({msg: 'Done'})
  }).catch(next)
}

function oldCopies(request, response, next) {
  const options = {
    uri: process.env.TRANS_HOST+'copies/old',
    json: true
  }
  let books = []
  let copies = []
  rp(options).then(copiesR=>{
    copies = copiesR
    
    for (var i = 0; i < copies.length; i++) {
      if(!books.includes(copies[i].bookId)) books.push(copies[i].bookId)
    }
    let promises = []

    for (var i = 0; i < books.length; i++) {
      promises.push(
        rp({uri: process.env.BOOKS_HOST+'books/minimal/'+books[i], json: true})
      )
    }
    return Promise.all(promises).then(values=>{

      for (var i = 0; i < copies.length; i++) {
        for (var j = 0; j < values.length; j++) {
          if(copies[i].bookId === values[j].id){
            copies[i].book = values[j]
          }
        }
        delete copies[i].bookId
      }

      response.status(200).json(copies)
    })
  }).catch(next)
}

export default { list, get, getLots, getByBarcode, massCatalog, putState, lastByBarcode, oldCopies }
