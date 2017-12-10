import express from 'express'
import groupController from '../controllers/group'
import authController from '../controllers/auth'

const router = express.Router()

// router.use(authController.checkToken, authController.validateManagement)

router.route('/') //Remember, this points to /apiauth/groups/
.get(groupController.list)
.post(groupController.create)

router.route('/:groupId') //points to /apiauth/groups/:groupId
.get(groupController.get)
.put(groupController.update)
.delete(groupController.destroy)

router.route('/:groupId/addPolicies')
.post(groupController.addPolicies)

router.route('/:groupId/removePolicies')
.delete(groupController.removePolicies)


router.param('groupId', groupController.load)

export default router
