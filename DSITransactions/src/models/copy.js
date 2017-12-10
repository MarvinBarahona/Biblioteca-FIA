function modelCopy(sequelize, DataTypes) {

  const Copy = sequelize.define('Copy', {
    barcode: {type: DataTypes.STRING, allowNull: true, unique: true},
    catalogued: {type: DataTypes.BOOLEAN, defaultValue: false},
    state: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Inactivo'},
    bookId: {type: DataTypes.INTEGER, allowNull: false}
  },{freezeTableName: true})

  Copy.beforeSave(copy=>{
    // Maybe validations or computed attributes
  })

  Copy.changeStates = function(indexes, newState, tran) {
    const promises = []
    for (var i = 0; i < indexes.length; i++) {
      promises.push(this.update({state: newState}, {where: {id: indexes[i]} ,transaction: tran}))
    }

    return Promise.all(promises)
  }

  Copy.associate = (models)=>{
    Copy.belongsToMany(models.Transaction, {
      through: models.CopiesTransactions,
      as: 'transactions'
    })
  }

  return Copy

}

export default modelCopy
