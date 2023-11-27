const User = require('../models/user')
const {createAccessToken, createRefreshToken} = require('../middlewares/jwt')
//Đăng ký
const register = async(req, res)=>{
    try {
        const {fullname, email, password} = req.body
        if(!fullname || !email || !password) throw new Error('Missing inputs')
        const checkEmail = await User.findOne({email})
        if(checkEmail) throw new Error('Email already exists')
        else{
            const rs = await User.create(req.body)
            return res.status(200).json({
                success: rs ? true : false,
                message: rs ? 'Thành công' : 'Thất bại',
                data: rs 
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }

}
//Đăng nhập
const login = async(req, res) =>{
    try {
        const {email, password} = req.body
        if(!email || !password) throw new Error('Missing input')
        const user = await User.findOne({email})
        if(user && await user.isCorrectPassword(password)){
            const {role, password, refreshToken, ...userData} = user.toObject()
            //Tạo access token
            const accessToken = createAccessToken(user._id, role)
            //Tạo refresh token
            const newRefreshToken = createRefreshToken(user._id)

            const rs = await User.findByIdAndUpdate(user._id, {refreshToken: newRefreshToken}, {new: true}).select('-password')
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000})
            return res.status(200).json({
                success: rs ? true : false,
                message: rs ? 'Đăng nhập hành công' : 'Đăng nhập thất bại',
                accessToken,
                data: rs ? rs : null
            })
        }
        
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//Đăng xuất
const logout = async(req, res) =>{
    try {
        const {uid} = req.user
        const rs = await User.findByIdAndUpdate(uid, {refreshToken: ''}, {new: true})
        res.clearCookie('refreshToken')
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Logout thành công' : 'logout thất bại',
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//Lấy ra thông tin user
const getCurrent = async(req, res) =>{
    try {
        const {uid} = req.user
        const rs = await User.findById(uid).select('-password -role -refreshToken')
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//lấy ra danh sách user
const getAll = async(req, res) =>{
    try {
        const rs = await User.find()
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })  
    }
}
//Cập nhật thông tin bởi user
const updateById = async(req, res) =>{
    try {
        const {uid} = req.user
        if(!uid || Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        const rs = await User.findByIdAndUpdate(uid, req.body, {new:true}).select('-password -role')
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//cập nhập thông tin bởi admin
const updateByAdmin = async(req, res) =>{
    try {
        const {_id} = req.params 
        if(!_id || Object.keys(req.body)) throw new Error('Missing inputs')
        const rs = await User.findByIdAndUpdate(_id, req.body, {new: true})
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//xóa user bởi admin
const deleteById = async(req, res) =>{
    try {
        const {_id} = req.params 
        if(!_id) throw new Error('Missing inputs')
        const rs = await User.findByIdAndDelete(_id)
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//update thông tin địa chỉ nhận hàng
const updateAddress = async(req, res) =>{
    try {
        const {uid} = req.user
        const {address} = req.body
        if(!uid || !address) throw new Error('Missing inputs')
        const rs = await User.findByIdAndUpdate(uid, address, {new: true})
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
const uploadImage = async(req, res) =>{
    try {
        const {uid} = req.user
        if(!req.file) throw new Error('Missing inputs')
        const rs = await User.findByIdAndUpdate(uid, {image: req.file.path}, {new: true})
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'hành công' : 'Thất bại',
            data: rs,
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
module.exports = {
    register,
    login,
    logout,
    getCurrent,
    getAll,
    updateById,
    updateByAdmin,
    deleteById,
    uploadImage,
}




