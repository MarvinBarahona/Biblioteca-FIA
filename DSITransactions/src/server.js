import dotenv from 'dotenv'
dotenv.config()
import app from './config/express'
import models from './models'


app.listen(process.env.PORT, ()=>{
  models.sequelize.sync({force: false}).then(()=>{
  }).catch(err=>{
  })
})


export default app
