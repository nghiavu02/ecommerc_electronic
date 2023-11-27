const jwt = require('jsonwebtoken')
const verifyAccessToken = async(req, res, next) =>{
    if(req?.headers?.authorization?.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SESCRET, (err, decoded) =>{
            if(err) throw new Error('Access token lỗi')
            req.user = decoded
            next()
        })        

    }
}
const isAdmin = async(req, res, next) =>{
    try {
        const {role} = req.user
        if(role != 'Admin') throw new Error('Chức năng chỉ dành cho quản trị viên')
        next()
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}


module.exports = {
    verifyAccessToken, 
    isAdmin
}