const ctrls = require('../controllers/user')
const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const fileUploader = require('../config/cloudinary.config')

router.post('/cloudinary-upload',[verifyAccessToken], fileUploader.single('image'), ctrls.uploadImage)
router.post('/login', ctrls.login)
router.post('/register', ctrls.register)
router.get('/logout',[verifyAccessToken], ctrls.logout)
router.get('/getall',[verifyAccessToken, isAdmin], ctrls.getAll)
router.get('/',[verifyAccessToken], ctrls.getCurrent)
router.post('/:pid',[verifyAccessToken, isAdmin], ctrls.updateCart)
router.get('/forgotpassword', ctrls.forgotPassword)
router.post('/resetpassword', ctrls.resetPassword)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deleteById)
router.put('/update', [verifyAccessToken], ctrls.updateById)
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateByAdmin)
module.exports = router