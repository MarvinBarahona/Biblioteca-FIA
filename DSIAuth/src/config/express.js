import express from 'express'
import expressValidation from 'express-validation'
import bodyParser from 'body-parser'
import routes from '../routes'
import Sequelize from 'sequelize'
import pino from 'express-pino-logger'
import jwt from 'jsonwebtoken'

const app = express()
app.use(pino())

// CORS OPTIONS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
  if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next()
    }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//We mount the routes folder (Using express router, refer to the docs)
app.use('/', routes)


//Handle all error types
app.use((err, req, res, next) => {
  req.log.error(err.message)
  
  switch(err.constructor){
    case expressValidation.ValidationError:
      res.status(500).json(err);
      break

    case Sequelize.ValidationError:
        res.status(422).json(err.errors)
        break

    case Sequelize.UniqueConstraintError:
        res.status(422).json(err.errors)
        break

    case jwt.JsonWebTokenError:
        res.status(400).json({error: err.message})
        break

    default:
      const status = err.status || 500
      res.status(status).json({status: err.status, message: err.message, errors: err.errors});
  }

})

export default app
