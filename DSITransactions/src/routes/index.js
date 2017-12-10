import express from 'express'

import copyRoutes from './copy'
import tranRoutes from './transaction'
import profRoutes from './profile'


const router = express.Router()

router.get('/', (request, response)=>{
  response.status(200).json({status: 'Home route, dont panic'})
})

router.use('/copies', copyRoutes)
router.use('/transactions', tranRoutes)
router.use('/profiles', profRoutes)


export default router
