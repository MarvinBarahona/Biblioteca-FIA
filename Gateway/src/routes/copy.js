import express from 'express'
import authController from '../controllers/authentication'
import permController from '../controllers/permission'
import copyController from '../controllers/copy'

const router = express.Router()

router.route('/massCataloging')
.post(authController.checkToken, permController.validateCataloging, copyController.massCatalog)

router.route('/:barcode/transaction')
.get(authController.checkToken, copyController.lastByBarcode)

router.route('/discards')
.get(authController.checkToken, permController.validateExchange, copyController.oldCopies)

router.route('/:copyId')
.put(authController.checkToken, permController.validateActivation, copyController.putState)

router.use(authController.checkToken, permController.validateCopyGet) //Check the token before running any of the following functions, since all of this operations require a token

router.route('/')
.get(copyController.list)

router.route('/lots')
.get(copyController.getLots)

router.route('/barcode/:barcode')
.get(copyController.getByBarcode)

router.route('/:copyId')
.get(copyController.get)


export default router
