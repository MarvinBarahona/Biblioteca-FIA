function modelOrder(sequelize, DataTypes) {

  //Defining the model
  const Order = sequelize.define('Order', {
    price: {type: DataTypes.REAL, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
  }, {freezeTableName: true})

  //Static methods

  //Instance methods


  //Associations


  return Order
}

export default modelOrder
