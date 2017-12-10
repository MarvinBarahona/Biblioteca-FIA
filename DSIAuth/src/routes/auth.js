import express from 'express'
import authController from '../controllers/auth'

const router = express.Router()

router.route('/authenticate')
.post(authController.authenticate, authController.generateToken)

// router.route('/verify/:token')
// .get(authController.checkToken, authController.showDecodedToken)

router.route('/change_password/')
.post(authController.changePassword)

router.route('/request_password')
.post(authController.requestPassChange)

router.route('/create_account')
.post(authController.externalAccount)

export default router
