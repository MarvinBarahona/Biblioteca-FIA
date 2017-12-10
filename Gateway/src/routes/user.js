import express from 'express'
import userController from '../controllers/user'
import authController from '../controllers/authentication'
import permController from '../controllers/permission'

const router = express.Router()

router.route('/recovery')
.post(authController.requestPass)

router.route('/changePassword')
.post(authController.changePassword)

router.use(authController.checkToken, permController.validateManagement) //Check the token before running any of the following functions, since all of this operations require a token

router.route('/') //Remember, this points to /apiauth/users/
.get(userController.list)
.post(userController.create)

router.route('/groups')
.get(userController.listGroups)

router.route('/:userId/setPolicies')
.post(userController.setPolicies)

router.route('/:userId')
.get(userController.get)
.put(userController.update)
.delete(userController.remove)
//
// router.route('/:userId/addGroup/:groupId')
// .post(userController.addToGroup)
//
// router.route('/:userId/removeGroup/:groupId')
// .delete(userController.removeFromGroup)
//
// router.route('/:userId/addPolicies')
// .post(userController.addPolicies)
//
// router.route('/:userId/removePolicies')
// .delete(userController.removePolicies)
//

export default router
