import dotenv from 'dotenv'
dotenv.config()
import app from './config/express'
import models from './models'

app.listen(process.env.PORT, ()=>{
  models.sequelize.sync({force: false}).then(()=>{

  })
})

export default app

// TO DO: Implement the async library for all operations with collections
//
