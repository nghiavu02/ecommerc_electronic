const userRouter = require('./user')
const productRouter = require('./product')
const colorRouter = require('./color')
const productCategoryRouter = require('./productCategory')
const blogCategoryRouter = require('./blogCategory')

function initRoutes(app){
    app.use('/api/color', colorRouter)
    app.use('/api/user', userRouter)
    app.use('/api/productcategory', productCategoryRouter)
    app.use('/api/productcategory', blogCategoryRouter)
    app.use('/api/product', productRouter)
}

module.exports = initRoutes