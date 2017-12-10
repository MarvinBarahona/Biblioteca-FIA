function newUser(request, response, next) {
  // return response.status(200).json({message: 'Validation active'})
  next()
}

export default {newUser}
