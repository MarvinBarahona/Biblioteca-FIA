import express from 'express'
// import the controller(s)
import suggestionController from '../controllers/suggestion'

const router = express.Router()

router.route('/')
.get(suggestionController.list)

router.route('/periods')
.delete(suggestionController.deleteSuggestions)

router.route('/student')
.post(suggestionController.getType, suggestionController.createSuggestion)

router.route('/teacher')
.post(suggestionController.getType, suggestionController.createSuggestion)

router.route('/user/:userId')
.get(suggestionController.getHistory)

router.route('/:suggId/upvote')
.post(suggestionController.approvalType, suggestionController.approve)

router.route('/:suggId/orders')
.post(suggestionController.approvalType ,suggestionController.approve)

router.route('/:suggId')
.get(suggestionController.get)
.put(suggestionController.update)

router.param('suggId', suggestionController.load)

export default router
