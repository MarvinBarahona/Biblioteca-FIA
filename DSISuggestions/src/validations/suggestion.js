function createSuggestValidation(request, response, next){
if (!("title" in request.body && "isbn" in request.body)) {
return {error: "title and isbn are mandatory"}
//validations for title and ISBN in all the suggestions
}else {
  if (request.url==='/student' && "quantity" in request.body) {
    return {error: "quantity is not allowed for students"}
    //validation to not use quantity as a student
  } else if (request.url==='/teacher') {
    request.checkBody("quantity", "Must be a positive number").custom((value) => value > 0)
    //validation for positive number
    request.checkBody("quantity", "Must be an integer number").custom((value)=> Number.isInteger(value))
    //validation for an integer number
    //these validation are only for teachers
  }
  request.checkBody("isbn", "Must be a valid ISBN").custom((value) => /^[\d-]{13}$|^[\d-]{17}$/.test(value)===true)
  //Validation ISBN for 10 or 13 characters
  //request.checkBody("title", "Must be an alpha numeric title").custom((value) => /^[ A-Za-záéíóúÁÉÍÓÚñ.-_,]+$/i.test(value)===true)
  //validation for tilte
  request.checkBody("author", "Must be an alpha numeric author").custom((value) => /^[ A-Za-záéíóúÁÉÍÓÚñ.-_,]+$/i.test(value)===true)
  //validation for author
  request.checkBody("publisher", "Must be an alpha numeric publisher").custom((value) => /^[ A-Za-záéíóúÁÉÍÓÚñ.-_,]+$/i.test(value)===true)
  //validation for publisher
  request.checkBody("price", "Must be a positive number").custom((value) => value > 0)
  //validation for a positive number
  request.checkBody("price", "Must be a precision 2 number").custom((value) => /^(?=[^.])\d*(?:\.\d{0,2})?$/.test(value)===true)
  //validation for a precision 2 numebr
  request.checkBody("edition", "Must be a positive number").custom((value) => value > 0)
  //validation for a positive edition
  request.checkBody("edition", "Must be an integer number").custom((value)=> Number.isInteger(value))
  //validation for an integer number
  request.checkBody("userName", "Must be an alpha numeric userName").custom((value) => /^[ A-Za-záéíóúÁÉÍÓÚñ.-_,]+$/i.test(value)===true)
  //validation for name
}
  var errors = request.validationErrors()
  return errors
}

export default {createSuggestValidation}
