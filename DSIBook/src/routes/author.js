import express from 'express'
import authorController from '../controllers/author'

const router = express.Router()

// router.route('/')
// .get(authorController.list)
// .post(authorController.create)

router.route('/authorPub/')
.get(authorController.getAuthoPub)

// router.route('/:authorId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
// .get(authorController.get)
// .put(authorController.update)
// .delete(authorController.destroy)
//
// router.param('authorId', authorController.load)

export default router
