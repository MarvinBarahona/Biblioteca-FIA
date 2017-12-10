import express from 'express'
import subjectController from '../controllers/subject'

const router = express.Router()

router.route('/')
.get(subjectController.list)
.post(subjectController.create)

router.route('/:subjectId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
.get(subjectController.get)
// .put(subjectController.update)
// .delete(subjectController.destroy)

router.param('subjectId', subjectController.load)

export default router
