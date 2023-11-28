const ctrls = require('../controllers/blogCategory')
const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyAccessToken,isAdmin], ctrls.create)
router.put('/:bcid',[verifyAccessToken,isAdmin], ctrls.updateById)
router.delete('/:bcid',[verifyAccessToken,isAdmin], ctrls.deleteById)
router.get('/:bcid', ctrls.getById)
router.get('/', ctrls.getAll)

module.exports = router
