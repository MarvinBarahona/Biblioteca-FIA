function modelSuggestion(sequelize, DataTypes) {

  //Defining the model
  const Suggestion = sequelize.define('Suggestion', {
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    edition: {type: DataTypes.DECIMAL, allowNull: false},
    publisher: {type: DataTypes.STRING, allowNull: false},
    isbn: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.NUMERIC(6, 2), defaultValue: '0.00'},
    upvotes: {type: DataTypes.INTEGER, defaultValue: 0},
    orders: {type: DataTypes.INTEGER, defaultValue: 0},
    quantity: {type: DataTypes.INTEGER},
    reason: {type: DataTypes.STRING},
    state: {type: DataTypes.ENUM('Aceptada', 'Pendiente', 'Rechazada'), defaultValue: 'Pendiente'}
  }, {freezeTableName: true})

  //Static methods
  //Instance methods
  Suggestion.prototype.formatCourses = function(votes) {
    const refSuggestion = Object.assign({}, this.dataValues)
    delete refSuggestion.Courses
    let i = 0
    const refCourses = this.Courses.map(function(c) {
      const rCourse = {id: c.id, name: c.name, upvotes: c.Proposal.upvotes, orders: c.Proposal.orders, votes: votes[i]}
      i++
      return rCourse
    })
    refSuggestion.Courses = refCourses
    return refSuggestion
  }

  //Associations
  Suggestion.associate = (models)=>{
    Suggestion.belongsToMany(models.Course, {
      through: models.Proposal
    })
  }

  return Suggestion
}

export default modelSuggestion
