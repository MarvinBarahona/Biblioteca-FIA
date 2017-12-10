import rp from 'request-promise-native'



function get(request, response, next) {
  const tranId = request.params.tranId

  const options1 = {
    uri: process.env.TRANS_HOST+'transactions/'+tranId,
    json: true
  }

  let tranToShow = {}
  let books = []

  rp(options1).then(tran=>{
    // Implement it with cache, this is only done because it needs to be done by August 31
    tranToShow = tran
    const copies = tran.copies


    for (var i = 0; i < copies.length; i++) {
      if(!books.includes(copies[i].bookId)) books.push(copies[i].bookId)
    }
    let promises = []

    for (var i = 0; i < books.length; i++) {
      promises.push(
        rp({uri: process.env.BOOKS_HOST+'books/minimal/'+books[i], json: true})
      )
    }
    return Promise.all(promises)

  }).then(values=>{

    for (var i = 0; i < tranToShow.copies.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if(tranToShow.copies[i].bookId === values[j].id){
          tranToShow.copies[i].book = values[j]
        }
      }
      delete tranToShow.copies[i].bookId
    }

    response.status(200).json(tranToShow)
  }).catch(next)
}

function createT(request, response, next) {
  request.body.userId = request.user.id
  request.body.userName = request.user.fullname

  const options = {
    method: 'POST',
    body: request.body,
    uri: process.env.TRANS_HOST+'transactions'+request.url,
    json: true
  }
  rp(options).then(rep=>{
    if(request.url=='substitutions') next()
    response.status(201).json(rep)
  }).catch(next)
}

function createSubstitution(request, response, next) {
  request.body.substitution.userId = request.user.id
  request.body.substitution.userName = request.user.fullname
  request.body.replacement.userId = request.user.id
  request.body.replacement.userName = request.user.fullname

  // First verify if the barcode specified
  const options0 = {
    method: 'GET',
    uri: process.env.TRANS_HOST+'copies?barcode='+request.body.replacement.copies[0].barcode,
    json: true
  }
  rp(options0).then(options0).then(copy=>{
    if(copy.length!=0) return response.status(422).json({message: 'Un ejemplar con ese código de barras ya existe'})
    let repTran = {}
    const options1 = {
      method: 'POST',
      body: request.body.substitution,
      uri: process.env.TRANS_HOST+'transactions/substitutions',
      json: true
    }
    return rp(options1).then(rep=>{
      request.body.replacement.transactionId = rep.id
      const options2 = {
        method: 'POST',
        body: request.body.replacement,
        uri: process.env.TRANS_HOST+'transactions/repositions',
        json: true
      }
      return rp(options2).then(rep=>{
        repTran = rep
        const options3 = {
          method: 'PUT',
          body: {penalized: false},
          uri: process.env.TRANS_HOST+'profiles/'+request.body.substitution.details.userId,
          json: true
        }
        return rp(options3).then(user=>{
          response.status(201).json(repTran)
        })
      })
    })
  }).catch(next)

}

export default { get, createT, createSubstitution }
