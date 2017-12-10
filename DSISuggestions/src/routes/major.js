import express from 'express'
import majorController from '../controllers/major'
const router = express.Router()

router.route('/')
.get(majorController.list)
.post(majorController.massCreate)

export default router
