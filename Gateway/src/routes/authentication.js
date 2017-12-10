import express from 'express'
import authController from '../controllers/authentication'

const router = express.Router()

router.route('/login')
.post(authController.authenticate, authController.generateToken)

router.route('/verifyGoogle')
.post(authController.verifyGoogle, authController.generateToken)

router.route('/verify/:token')
.get(authController.checkToken, authController.showDecodedToken)

// router.route('/change_password/:userId/:token')
// .post(authController.changePassword)
//
// router.route('/newpassword')
// .post(authController.requestPass)

export default router
