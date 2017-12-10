import express from 'express'
//We separate the routes in different files if we want to, in this case it may be overkill because its only 2 controllers
import bookRoutes from './book'
import categoryRoutes from './author'
import subjectRoutes from './subject'


const router = express.Router()

router.get('/', (request, response)=>{
  response.status(200).json({status: 'Home'})
})

router.use('/books', bookRoutes)
router.use('/subjects', subjectRoutes)
router.use('/authors', categoryRoutes)

export default router
