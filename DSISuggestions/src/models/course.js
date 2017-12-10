function modelCourse(sequelize, DataTypes) {

  //Defining the model
  const Course = sequelize.define('Course', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    code: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {freezeTableName: true})

  //Static methods

  //Instance methods


  //Associations


  Course.associate = (models)=>{
    
    Course.belongsToMany(models.Suggestion, {
      through: models.Proposal
    })
  }


  return Course
}

export default modelCourse
