import express from 'express'
import policyController from '../controllers/policy'
import authController from '../controllers/auth'

const router = express.Router()

// router.use(authController.checkToken, authController.validateManagement) //Validating the roles

router.route('/') //Remember, this points to /apiauth/policys/
.get(policyController.list)
.post(policyController.create)

router.route('/:policyId') //points to /apiauth/policys/:policyId
.get(policyController.get)
.put(policyController.update)
.delete(policyController.destroy)


router.param('policyId', policyController.load)

export default router
