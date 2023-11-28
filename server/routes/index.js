const userRouter = require('./user')
const productRouter = require('./product')
const colorRouter = require('./color')
const productCategoryRouter = require('./productCategory')
const blogCategoryRouter = require('./blogCategory')
const couponRouter = require('./coupon')
const brandRouter = require('./brand')
const blogRouter = require('./blog')
const orderRouter = require('./order')

function initRoutes(app){
    app.use('/api/coupon', couponRouter)
    app.use('/api/color', colorRouter)
    app.use('/api/user', userRouter)
    app.use('/api/productcategory', productCategoryRouter)
    app.use('/api/productcategory', blogCategoryRouter)
    app.use('/api/product', productRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/blog', blogRouter)
    app.use('/api/order', orderRouter)
}

module.exports = initRoutes