import dotenv from 'dotenv'
dotenv.config()

let configDB = {}

switch(process.env.NODE_ENV){
  case 'development':
  configDB = process.env.DEV_DBURL
    break

  case 'production':
    configDB = process.env.PRO_DBURL
    break

  case 'test':
    configDB = process.env.TEST_DBURL
    break

}

export default configDB
