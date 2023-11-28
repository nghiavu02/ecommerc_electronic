const ctrls = require('../controllers/color')
const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyAccessToken,isAdmin], ctrls.create)
router.put('/:cid',[verifyAccessToken,isAdmin], ctrls.updateById)
router.delete('/:cid',[verifyAccessToken,isAdmin], ctrls.deleteById)
router.get('/:cid', ctrls.getById)
router.get('/', ctrls.getAll)

module.exports = router
