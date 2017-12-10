import dotenv from 'dotenv'
dotenv.config()

let configDB = {}

switch(process.env.NODE_ENV){
  case 'development':
  configDB = process.env.DEV_DBURL
    // configDB.name = process.env.DEV_DBNAME
    // configDB.username = process.env.DEV_DBUSER
    // configDB.password = process.env.DEV_DBPASS
    // configDB.host = process.env.DEV_DBHOST
    // configDB.dialect = process.env.DEV_DBDIAL
    break

  case 'production':
    configDB = process.env.PRO_DBURL
    // configDB.name = process.env.PRO_DBNAME
    // configDB.username = process.env.PRO_DBUSER
    // configDB.password = process.env.PRO_DBPASS
    // configDB.host = process.env.PRO_DBHOST
    // configDB.dialect = process.env.PRO_DBDIAL
    break

  case 'test':
    configDB = process.env.TEST_DBURL
    // configDB.name = process.env.TEST_DBNAME
    // configDB.username = process.env.TEST_DBUSER
    // configDB.password = process.env.TEST_DBPASS
    // configDB.host = process.env.TEST_DBHOST
    // configDB.dialect = process.env.TEST_DBDIAL
    break

}

export default configDB
