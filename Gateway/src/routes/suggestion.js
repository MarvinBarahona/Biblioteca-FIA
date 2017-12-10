import express from 'express'
import suggCtrl from '../controllers/suggestion'
import authCtrl from '../controllers/authentication'
import permCtrl from '../controllers/permission'

const router = express.Router()

router.use(authCtrl.checkToken)

router.route('/')
.get(permCtrl.validateSuggestions, suggCtrl.list)

router.route('/periods')
.post(permCtrl.validateSuggestions, suggCtrl.changePeriod)

router.route('/careers')
.get(permCtrl.validateSuggestions, suggCtrl.listMajors)

router.route('/user/:userId')
.get(permCtrl.validateSuggestions, suggCtrl.history)

router.route('/teacher')
.post(permCtrl.validateTeacher, suggCtrl.create)

router.route('/student')
.post(permCtrl.validateStudent, suggCtrl.create)

router.route('/:suggId/votes')
.post(permCtrl.validateStudent, suggCtrl.upvote)

router.route('/:suggId/orders')
.post(permCtrl.validateTeacher, suggCtrl.order)

router.route('/:suggId')
.get(permCtrl.validateSuggestions, suggCtrl.get)
.put(permCtrl.validateSuggestions, suggCtrl.update)


export default router
