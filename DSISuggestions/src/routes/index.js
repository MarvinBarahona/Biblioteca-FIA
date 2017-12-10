import express from 'express'

import suggestionRoutes from './suggestions'
import majorRoutes from './major'

const router = express.Router()

router.get('/', (request, response)=>{
  response.status(200).json({status: 'Home'})
})

router.use('/suggestions', suggestionRoutes)
router.use('/majors', majorRoutes)

export default router
