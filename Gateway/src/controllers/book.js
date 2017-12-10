import rp from 'request-promise-native'

function list(request, response, next) {
  const options = {
    uri: process.env.BOOKS_HOST+'books'+request.url,
    json: true
  }
  rp(options).then(books=>{
    response.status(200).json(books)
  }).catch(next)
}

function listPublic(request, response, next) {
  const arrayS = request.url.split('?')
  const filter = arrayS.length==1 ? '' : '&'+arrayS[1]
  const options = {
    uri: process.env.BOOKS_HOST+'books?catalogued=1&orderBy=createdAt&limit=10'+filter, //Filtros adicionales requeridos por esta ruta
    json: true
  }

  rp(options).then(books=>{
    response.status(200).json(books)
  }).catch(next)
}

function create(request, response, next) {
  const options = {
    method: 'POST',
    body: request.body,
    uri: process.env.BOOKS_HOST+'books',
    json: true
  }
  rp(options).then(bookCreated=>{
    response.status(200).json(bookCreated)
  }).catch(next)
}

function get(request, response, next) {
  const bookId = request.params.bookId
  const options = {
    uri: process.env.BOOKS_HOST+'books/'+bookId,
    json: true
  }

  let bookToShow = {}

  rp(options).then(book=>{
    const options2 = {
      uri: process.env.TRANS_HOST+'copies/byBook/'+bookId,
      json: true
    }
    bookToShow = book
    return rp(options2)
  }).then(copies=>{
    response.status(200).json({book: bookToShow, copies: copies})
  }).catch(next)

}

function getPublic(request, response, next) {
  const bookId = request.params.bookId
  const options = {
    uri: process.env.BOOKS_HOST+'books/'+bookId+'?catalogued=1',
    json: true
  }
  rp(options).then(book=>{
    response.status(200).json(book)
  }).catch(next)
}

function getAuthorPub(request, response, next) {
  const options = {
    uri: process.env.BOOKS_HOST+'authors/authorPub',
    json: true
  }
  rp(options).then(aupubs=>{
    response.status(200).json(aupubs)
  }).catch(next)
}

function getCatalogData(requets, response, next) {

  const options = {
    uri: process.env.BOOKS_HOST+'subjects',
    json: true
  }

  rp(options).then(subjects=>{
    response.status(200).json(subjects)
  }).catch(next)


}

function update(request, response, next) {
  response.status(200).json({message: 'Feature not available'})
}

function setCatalog(request, response, next) {
  const bookId = request.params.bookId
  const options = {
    method: 'POST',
    body: request.body,
    uri: process.env.BOOKS_HOST+'books/'+bookId+'/setCataloging',
    json: true
  }

  rp(options).then(rep=>{
    response.status(200).json(rep)
  }).catch(next)
}


function finishCataloging(request, response, next) {
  const bookId = request.params.bookId
  const options = {
    method: 'POST',
    uri: process.env.BOOKS_HOST+'books/'+bookId+'/finishCataloging',
    json: true
  }
  rp(options).then(rep=>{
    response.status(200).json(rep)
  }).catch(next)

}

export default { list, create, get, getCatalogData, update, setCatalog, finishCataloging, getAuthorPub, listPublic, getPublic }
