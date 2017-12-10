import dotenv from 'dotenv'
dotenv.config()

import app from './config/express'

app.listen(process.env.PORT, ()=>{

})

export default app
