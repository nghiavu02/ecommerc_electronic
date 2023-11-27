const ctrls = require('../controllers/product')
const router = require('express').Router()
const uploadImage = require('../config/cloudinary.config')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
router.put('/rating',[verifyAccessToken], ctrls.rating)
// router.put('/rating',[verifyAccessToken, isAdmin], uploadImage.array('images', 10), ctrls.)

module.exports = router
