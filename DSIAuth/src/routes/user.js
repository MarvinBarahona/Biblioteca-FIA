import express from 'express'
import userController from '../controllers/user'
import authController from '../controllers/auth'
import checkUser from '../validations/user'

const router = express.Router()

router.route('/') //Remember, this points to /apiauth/users/
.get(userController.list)
.post(checkUser.newUser, userController.create)

router.route('/checkPass')
.post(userController.checkPass)

router.route('/:userId') //points to /apiauth/users/:userId  (Add the authentication  requirement later)
.get(userController.get)
.put(userController.update)
.delete(userController.destroy)

router.route('/:userId/addGroup/:groupId')
.post(userController.addToGroup)

router.route('/:userId/removeGroup/:groupId')
.delete(userController.removeFromGroup)

// router.route('/:userId/addPolicies')
// .post(userController.addPolicies)
//
// router.route('/:userId/removePolicies')
// .delete(userController.removePolicies)

router.route('/:userId/setPolicies')
.post(userController.setPolicies)

//Abstraction for the operations on a single user, this will request from the database the user required
//and pass it on to the other operation so we dont have to repeat our code on every Abstraction

router.param('userId', userController.load)

export default router
