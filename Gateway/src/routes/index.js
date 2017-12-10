import express from 'express'

import authRoutes from './authentication'
import userRoutes from './user'
import bookRoutes from './book'
import copyRoutes from './copy'
import tranRoutes from './transaction'
import suggRoutes from './suggestion'

const router = express.Router()

router.get('/', (request, response)=>{
  response.status(200).json({message: 'Gateway home'})
})

router.use('/authentication', authRoutes)
router.use('/users', userRoutes)
router.use('/books', bookRoutes)
router.use('/copies', copyRoutes)
router.use('/transactions', tranRoutes)
router.use('/suggestions', suggRoutes)

export default router
