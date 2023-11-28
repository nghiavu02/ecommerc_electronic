const ctrls = require('../controllers/productCategory')
const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyAccessToken,isAdmin], ctrls.create)
router.put('/:pcid',[verifyAccessToken,isAdmin], ctrls.updateById)
router.delete('/:pcid',[verifyAccessToken,isAdmin], ctrls.deleteById)
router.get('/:pcid', ctrls.getById)
router.get('/', ctrls.getAll)

module.exports = router
