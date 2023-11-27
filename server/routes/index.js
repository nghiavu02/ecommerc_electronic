const userRouter = require('./user')
const productRouter = require('./product')

function initRoutes(app){
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
}

module.exports = initRoutes