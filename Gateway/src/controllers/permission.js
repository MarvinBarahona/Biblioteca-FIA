function validateManagement(request, response, next) {
  if(request.user.Policies.includes(101)){
    next()
  } else{
    response.status(403).json({error: 'You are not authorized to manage employees'})
  }
}

function validateTransactions(request, response, next) {
  if(request.user.Policies.includes(113)){
    next()
  } else{
    response.status(403).json({error: 'You are not authorized to create transactions - 113'})
  }
}

function validateExchange(request, response, next) {
  if(request.user.Policies.includes(114)){
    next()
  } else{
    response.status(403).json({error: 'You are not authorized to create exchanges - 114'})
  }
}

function validateActivation(request, response, next) {
  if(request.user.Policies.includes(223)){
    next()
  } else{
    response.status(403).json({error: 'You are not authorized to change states - 223'})
  }
}

function validateCataloging(request, response, next) {
  if(request.user.Policies.includes(122)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to catalog - 122'})
  }
}

function validateGetBook(request, response, next) {
  if(request.user.Policies.includes(142)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to get books - 142'})
  }
}

function validateCopyGet(request, response, next) {
  if(request.user.Policies.includes(143)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to get copies - 143'})
  }
}

function validateStudent(request, response, next) {
  if(request.user.Policies.includes(410)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to get suggest - 410'})
  }
}

function validateTeacher(request, response, next) {
  if(request.user.Policies.includes(420)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to get order - 420'})
  }
}

function validateSuggestions(request, response, next) {
  if(request.user.Policies.includes(400)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to view suggestions - 400'})
  }
}

function validateReservation(request, response, next) {
  if(request.user.Policies.includes(235)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to reserve books - 235'})
  }
}

function validateLoan(request, response, next) {
  if(request.user.Policies.includes(215)){
    next()
  } else {
    response.status(403).json({error: 'You are not authorized to do loans - 215'})
  }
}

export default {validateManagement, validateTransactions, validateCataloging, validateGetBook, validateCopyGet, validateExchange, validateActivation,
  validateGetBook, validateStudent, validateTeacher, validateSuggestions, validateReservation, validateLoan}
