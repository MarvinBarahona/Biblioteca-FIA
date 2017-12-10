import express from 'express'
import routes from '../routes'
import bodyParser from 'body-parser'
import pino from 'express-pino-logger'

const app = express()
app.use(pino())

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

app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes)

app.use((err, req, res, next) => {
  req.log.error(err.message)
  const status = err.statusCode || 400
  res.status(status).json({message: err.message, errors: err.error})
  // switch(err.constructor){
  //   case expressValidation.ValidationError:
  //     res.status(500).json(err);
  //     break
  //
  //   case Sequelize.ValidationError:
  //       res.status(422).json(err.errors)
  //       break
  //
  //   default:
  //     res.status(500).json({status: err.status, message: err.message, errors: err.errors});
  // }

})

export default app
