import models from '../models'
import validations from '../validations/major'
const Course = models.Course
const Major = models.Major

function list(request, response, next) {
  const majorPms = Major.findAll({attributes: ['id', 'name']})
  const coursesPms = Course.findAll({attributes: ['id', 'name', 'code', 'MajorId']})
  Promise.all([majorPms, coursesPms]).then(values=>{
    response.status(200).json({majors: values[0], courses: values[1]})
  }).catch(next)
}

function massCreate(request, response, next) {

  var errors= validations.massCreateValidation(request)

  if (errors!=false) {
    response.send(errors)
    return
  }else {
    const majors = request.body.majors
    models.sequelize.transaction(t=>{
      const majorPromises = majors.map(m=> Major.create(m, {transaction: t, include: [{model: models.Course, as: 'courses'}]}))
      return Promise.all(majorPromises).then(()=>{
        response.status(201).json({message: 'Created all majors and subjects'})
      })
    }).catch(next)
  }



}

export default { list, massCreate }
