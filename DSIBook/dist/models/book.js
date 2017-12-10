'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function modelBook(sequelize, DataTypes) {

  //Defining the model
  var Book = sequelize.define('Book', {
    isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    authorName: { type: DataTypes.STRING, allowNull: false },
    publisherName: { type: DataTypes.STRING, allowNull: false },
    edition: { type: DataTypes.DECIMAL, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    authorCode: { type: DataTypes.STRING, allowNull: true },
    catalogued: { type: DataTypes.BOOLEAN, defaultValue: false },
    image: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING }
  }, { freezeTableName: true });

  //Static methods
  Book.beforeSave(function (book) {});

  //Instance methods
  //In case of association modification
  //save modifications will have to be manually done too
  //Destroy methods too

  //Associations
  //We can define the sequelize associations within a database, here we will
  //also define the virtual associations with rest facade
  //Associations with another api and we will manually write the get, set, and remove

  Book.associate = function (models) {
    Book.belongsToMany(models.Subject, {
      through: models.BookSubjects
    });
    Book.belongsToMany(models.Author, {
      through: models.BookAuthors
    });
    Book.hasOne(models.Stock);
    Book.belongsTo(models.Publisher);
  };

  return Book;
}

exports.default = modelBook;