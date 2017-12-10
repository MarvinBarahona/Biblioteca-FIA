function modelAuthor(sequelize, DataTypes) {

  // Model definition

  const Author = sequelize.define('Author', {
    name: {type: DataTypes.STRING, unique: false, allowNull: false},
    bio: {type: DataTypes.STRING, allowNull: true},
    organization: {type: DataTypes.STRING, allowNull: true}
    }, {freezeTableName: true}) //Tell sequelize to name the table as its defined in this instruction

  //Static methods and Hooks
  Author.beforeSave(author => {})

  //Instance methods
  // Model.prototype.doSomething = function () {}

  //Associations
  //We can define the sequelize associations within a database
  Author.associate = (models)=>{
    Author.belongsToMany(models.Book, {
      through: models.BookAuthors
    })
  }

  return Author

}

export default modelAuthor
