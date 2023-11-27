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

module.exports = router