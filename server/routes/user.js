const ctrls = require('../controllers/user')
const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploadImage = require('../config/cloudinary.config')
router.post('/login', ctrls.login)
router.post('/register', ctrls.register)
router.get('/logout',[verifyAccessToken], ctrls.logout)
router.post('/uploadimage',[verifyAccessToken],uploadImage.array('images', 10), ctrls.uploadImage)
router.get('/getall',[verifyAccessToken, isAdmin], ctrls.getAll)
router.get('/',[verifyAccessToken], ctrls.getCurrent)

module.exports = router