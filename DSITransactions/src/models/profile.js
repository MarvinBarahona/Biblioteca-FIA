function modelProfile(sequelize, DataTypes) {

  const Profile = sequelize.define('Profile', {
    userId: {type: DataTypes.INTEGER, primaryKey: true, autoincrement: false},
    userName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    lastTransaction: {type: DataTypes.DATE},
    transactionsDone: {type: DataTypes.INTEGER, defaultValue: 0},
    penalized: {type: DataTypes.BOOLEAN, defaultValue: false}
  },{freezeTableName: true})

  Profile.beforeSave(Profile=>{
    // Maybe validations or computed attributes
  })

  Profile.associate = (models)=>{
    Profile.belongsToMany(models.Transaction, {
      through: models.ProfilesTransactions,
      as: 'transactions'
    })
  }

  return Profile

}

export default modelProfile
