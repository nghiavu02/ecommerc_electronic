const ctrls = require('../controllers/inserData')
const router = require('express').Router()

router.post('/', ctrls.insertProduct)
router.post('/cart', ctrls.insertCategory)

module.exports = router
