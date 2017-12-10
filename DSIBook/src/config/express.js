import express from 'express'
import expressValidation from 'express-validation'
import bodyParser from 'body-parser'
import routes from '../routes'
import Sequelize from 'sequelize'
import pino from 'express-pino-logger'


const app = express()
app.use(pino())
// CORS Options
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
  if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

//Validate here the token, and if the request is different than GET /books
// or GET /books/:bookId check the group to match CATALOGUER OR boss
// Possibly check other neccesary politics, but the groups should be enough to get through

app.use(bodyParser.json({limit: '5mb'})) //For receiving images
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes)

//Define the validation middleware in different fles or in this

//Handle all error types
app.use((err, req, res, next) => {
  req.log.error(err.errors)
  switch(err.constructor){
    case expressValidation.ValidationError:
      res.status(500).json(err);
      break

    case Sequelize.ValidationError:
        res.status(422).json({errors: err.errors})
        break

    case Sequelize.UniqueConstraintError:
        res.status(422).json({errors: err.errors})
        break

    case Sequelize.DatabaseError:
        res.status(422).json({errors: err.errors})
        break

    default:
      const status = err.status || 500
      res.status(status).json({message: err.message, errors: err.errors});
  }

})

export default app
