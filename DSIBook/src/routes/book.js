import express from 'express'
import bookController from '../controllers/book'
import catController from '../controllers/cataloging'

const router = express.Router()

router.route('/')
.get(bookController.list)
.post(bookController.create)

router.route('/minimal/:minId')
.get(bookController.getMinimal)

// TODO: Add a method that saves the image to AWS and passes it as request.awsimage
router.route('/:bookId/setCataloging')
.post(catController.uploadImg, catController.setCataloging)

router.route('/:bookId/finishCataloging')
.post(catController.finishCat)

router.route('/:bookId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
.get(bookController.get)
.delete(bookController.destroy)

router.param('bookId', bookController.load)

export default router
