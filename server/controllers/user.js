const User = require('../models/user')
const {createAccessToken, createRefreshToken} = require('../middlewares/jwt')
const asyncHandler = require('express-async-handler')
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
//Thêm sản phẩm vào giỏ hàng
const updateCart = async (req, res) => {
    try {
      const { uid } = req.user;
      const { pid, color, quantity } = req.body;
      if (!pid || !color || !quantity) throw new Error('Missing input');
      const user = await User.findById(uid).select('cart')
      const cartIndex = user?.cart.findIndex(item => item.product.toString() === pid && item.color === color)   
      if(cartIndex!== -1){
        user.cart[cartIndex].quantity = quantity
      }else{
        user.cart.push({product: pid, color, quantity})
      }
      await user.save()
      const rs = await User.findById(uid);
      return res.status(200).json({
        success: rs ? true : false,
        message: rs ? 'thành công' : 'thất bại',
        data: rs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Có lỗi xảy ra: ${error.message}`
      });
    }
};
//refresh token
const refreshAccessToken = asyncHandler(async (req, res, next) => {
    //lấy token từ cookie
    const cookie = req.cookies
    //check xem có token hay không
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in  cookies')
    //check xem token có hợp lệ không
    await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        if (err) throw new Error('Invalid refresh token')
        //check token có khớp với token đã lưu trong db
        const response = await User.findOne({ _id: decode._id, refreshToken: cookie.refreshToken })
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id, response.role) : 'refresh token not matched'
        })
    })
})
//forgot password
const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.query;
    if (!email) return next(new Error('Missing email'));

    const user = await User.findOne({ email });
    if (!user) return next(new Error('User not found'));

    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `Xin vui lòng click vào link để thay đổi mật khẩu. Link có hiệu lực trong vòng 15 phút <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;
    const data = {
        email,
        html,
    };

    console.log(email);
    try {
        const rs = await sendToEmail(email, html);
        return res.status(200).json({
            success: true,
            result: rs,
        });
    } catch (error) {
        return next(error);
    }
});
//resset password
const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error("Mising inputs")
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.passwordChangeAt = Date.now()
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'mật khẩu đã được thay đổi' : 'lỗi password'
    })
})
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
    updateCart,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
}




