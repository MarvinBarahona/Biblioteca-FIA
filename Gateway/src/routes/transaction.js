import express from 'express'
import authController from '../controllers/authentication'
import permController from '../controllers/permission'
import transactionController from '../controllers/transaction'

const router = express.Router()

router.route('/:tranId')
.get(authController.checkToken, permController.validateCopyGet, transactionController.get)

router.use(authController.checkToken)

router.route('/purchase')
.post(permController.validateTransactions, transactionController.createT)

router.route('/donation')
.post(permController.validateTransactions, transactionController.createT)

router.route('/tradeout')
.post(permController.validateExchange, transactionController.createT)

router.route('/tradein')
.post(permController.validateTransactions, transactionController.createT)

router.route('/reservations')
.post(permController.validateSuggestions, transactionController.createT)

router.route('/loans')
.post(permController.validateLoan, transactionController.createT)

router.route('/renewals')
.post(permController.validateLoan, transactionController.createT)

router.route('/annulments')
.post(permController.validateReservation, transactionController.createT)

router.route('/returns')
.post(permController.validateLoan, transactionController.createT)

router.route('/retirement')
.post(permController.validateCopyGet, transactionController.createT)

router.route('/losses')
.post(permController.validateCopyGet, transactionController.createT)

router.route('/damages')
.post(permController.validateCopyGet, transactionController.createT)

router.route('/substitutions')
.post(permController.validateTransactions, transactionController.createSubstitution)

router.route('/restores')
.post(permController.validateTransactions, transactionController.createT)

router.route('/exonerations')
.post(permController.validateTransactions, transactionController.createT)

router.route('/discards')
.post(permController.validateExchange, transactionController.createT)

export default router
