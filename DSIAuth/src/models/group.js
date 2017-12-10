function modelGroup(sequelize, DataTypes) {

  //Defining the model
  const Group = sequelize.define('Group', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
  }, {freezeTableName: true})

  //Static methods


  //Instance methods

  //Associations
  Group.associate = (models)=>{
    // Group.belongsToMany(models.User, {
    //   through: models.UserGroups
    // })
    Group.belongsToMany(models.Policy, {
      through: models.GroupPolicies
    })
    Group.hasMany(models.User)

  }

  return Group

}

export default modelGroup
