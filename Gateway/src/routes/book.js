import express from 'express'
import authController from '../controllers/authentication'
import permController from '../controllers/permission'
import bookController from '../controllers/book'

const router = express.Router()

router.route('/') //Remember, this points to /apiauth/books/
.post(authController.checkToken, permController.validateTransactions, bookController.create)

router.route('/') //Remember, this points to /apiauth/books/
.get(authController.checkToken, permController.validateGetBook, bookController.list)

// router.use(authController.checkToken, permController.validateCataloging) //Check the token before running any of the following functions, since all of this operations require a token

router.route('/public')
.get(bookController.listPublic)

router.route('/subjects')
.get(authController.checkToken, permController.validateCataloging, bookController.getCatalogData)

router.route('/authorspublishers/')
.get(authController.checkToken, permController.validateTransactions, bookController.getAuthorPub)

router.route('/:bookId/setcatalog')
.post(authController.checkToken, permController.validateCataloging, bookController.setCatalog)

router.route('/:bookId/finishcatalog')
.post(authController.checkToken, permController.validateCataloging, bookController.finishCataloging)

router.route('/:bookId/public')
.get(bookController.getPublic)

router.route('/:bookId')
.get(authController.checkToken, permController.validateGetBook, bookController.get)


export default router
