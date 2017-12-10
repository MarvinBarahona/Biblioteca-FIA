import bcrypt from 'bcryptjs-then'

function modelUser(sequelize, DataTypes) {

  //Defining the model
  const User = sequelize.define('User', {
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    fullname: {type: DataTypes.STRING, allowNull: false}
  }, {freezeTableName: true, paranoid: true})

  //Static methods
  User.beforeSave(user => {
    return bcrypt.hash(user.password, 10).then(hash=>{
      user.password = hash
    })
  })

  //Instance methods
  User.prototype.checkPassword = function(toCompare){
    return bcrypt.compare(toCompare, this.password)
  }

  User.prototype.parseUser = function() {
    const userParsed = {id: this.id, email: this.email, fullname: this.fullname}
    let groupPol = []
    let userPol = []
    if(this.Group) {
      userParsed.Group = this.Group.name
      groupPol = this.Group.Policies.map(pol=>pol.code)
    }
    else userParsed.Group='None'

    if(this.Policies) userPol = this.Policies.map(pol=>pol.code)

    userParsed.Policies = groupPol.concat(userPol)

    return userParsed
  }

  User.prototype.detailPolicies = function() {
    const userParsed = {id: this.id, email: this.email, fullname: this.fullname}
    let groupPol = []
    let userPol = []
    if(this.Group) {
      userParsed.Group = this.Group.name
      groupPol = this.Group.Policies.map(pol=>pol.code)
    }
    else userParsed.Group='None'

    if(this.Policies) userPol = this.Policies.map(pol=>pol.code)

    userParsed.groupPol = groupPol
    userParsed.addedPol = userPol

    return userParsed
  }

  //Associations
  User.associate = (models)=>{
    User.belongsToMany(models.Policy, {
      through: models.UserPolicies
    })
    User.belongsTo(models.Group)
  }

  return User

}

export default modelUser
