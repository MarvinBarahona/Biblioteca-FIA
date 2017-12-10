function modelMajor(sequelize, DataTypes) {

  //Defining the model
  const Major = sequelize.define('Major', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    code: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {freezeTableName: true})

  //Static methods

  //Instance methods


  //Associations
  Major.associate = (models)=>{
    Major.hasMany(models.Course, {as: 'courses'})
  }

  return Major
}

export default modelMajor
