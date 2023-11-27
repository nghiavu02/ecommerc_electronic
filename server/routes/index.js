const userRouter = require('./user')

function initRoutes(app){
    app.use('/api/user', userRouter)
}

module.exports = initRoutes