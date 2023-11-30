const ctrls = require('../controllers/product')
const router = require('express').Router()
const fileUploader = require('../config/cloudinary.config')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
router.post('/cloudinary-upload/:pid',[verifyAccessToken, isAdmin], fileUploader.array('images', 10), ctrls.upload)
router.put('/rating',[verifyAccessToken], ctrls.rating)
router.post('/',[verifyAccessToken,isAdmin], ctrls.create)
router.get('/', ctrls.getAll)
router.delete('/:pid',[verifyAccessToken,isAdmin], ctrls.deleteById)

module.exports = router
