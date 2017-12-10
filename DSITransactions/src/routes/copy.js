import express from 'express'
import copyController from '../controllers/copy'

const router = express.Router()

router.route('/')
.get(copyController.list)

router.route('/byBook/:bookId')
.get(copyController.byBook)

router.route('/:barcode/transaction')
.get(copyController.lastByBarcode)

router.route('/old')
.get(copyController.getOld)

router.route('/:copyId')
.get(copyController.get)
.put(copyController.update)
// .delete(copyController.destroy)

router.route('/massCataloging')
.post(copyController.massCataloging)


router.param('copyId', copyController.load)

export default router
