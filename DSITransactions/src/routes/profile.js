import express from 'express'
import profCtrl from '../controllers/profile'

const router = express.Router()

router.route('/')
.post(profCtrl.create)
.get(profCtrl.list)
.put(profCtrl.massUpdate)

router.route('/:profId')
.put(profCtrl.update)

export default router
