import express from 'express'
import tranCtrl from '../controllers/transaction'


const router = express.Router()


router.route('/')
.get(tranCtrl.list)

router.route('/purchase')
.post(tranCtrl.getType, tranCtrl.acquisition)

router.route('/donation')
.post(tranCtrl.getType, tranCtrl.acquisition)

router.route('/tradeout')
.post(tranCtrl.getType, tranCtrl.valSalida, tranCtrl.existing)

router.route('/tradein')
.post(tranCtrl.getType, tranCtrl.association, tranCtrl.acquisition)

router.route('/reservations')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.existing)

router.route('/loans')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/renewals')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/annulments')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/returns')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/retirement')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.existing)

router.route('/damages')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/losses')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/restores')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/exonerations')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/substitutions')
.post(tranCtrl.getType, tranCtrl.valTran, tranCtrl.association, tranCtrl.existing)

router.route('/repositions')
.post(tranCtrl.getType, tranCtrl.association, tranCtrl.acquisition)

router.route('/discards')
.post(tranCtrl.getType, tranCtrl.valSalida, tranCtrl.existing)

router.route('/:transactionId')
.get(tranCtrl.get)
// .put(tranCtrl.update)
// .delete(tranCtrl.destroy)

router.param('transactionId', tranCtrl.load)

export default router
