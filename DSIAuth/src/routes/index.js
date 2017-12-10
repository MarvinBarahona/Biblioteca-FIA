import express from 'express'

//We separate the routes in different files if we want to, in this case it may be overkill because its only 2 controllers
import userRoutes from './user'
import groupRoutes from './group'
import authRoutes from './auth'
import policyRoutes from './policy'

const router = express.Router()

router.get('/', (request, response)=>{
  response.status(200).json({status: 'Home'})
})

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/groups', groupRoutes)
router.use('/policies', policyRoutes)

export default router
