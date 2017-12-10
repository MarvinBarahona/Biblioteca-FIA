function modelPolicy(sequelize, DataTypes) {

  //Defining the model
  const Policy = sequelize.define('Policy', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    code: {type: DataTypes.INTEGER, unique: true, allowNull: false}
  }, {freezeTableName: true})

  //Static methods


  //Instance methods

  //Associations
  Policy.associate = (models)=>{
    Policy.belongsToMany(models.User, {
      through: models.UserPolicies
    })
    Policy.belongsToMany(models.Group, {
      through: models.GroupPolicies
    })
  }

  return Policy

}

export default modelPolicy
