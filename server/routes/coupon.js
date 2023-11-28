const ctrls = require('../controllers/coupon')
const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyAccessToken,isAdmin], ctrls.create)
router.put('/:cpid',[verifyAccessToken,isAdmin], ctrls.updateById)
router.delete('/:cpid',[verifyAccessToken,isAdmin], ctrls.deleteById)
router.get('/code', ctrls.getByCode)
router.get('/', ctrls.getAll)
router.get('/:cpid', ctrls.getById)

module.exports = router
