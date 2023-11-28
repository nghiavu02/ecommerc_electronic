const Coupon = require('../models/coupon')
//Thêm coupon
const create = async(req, res) =>{
    try {
        const {start, end} = req.body 
        const endDate = new Date(end)
        const startDate = new Date(start)
        const now = new Date()
        console.log(now, endDate)
        if(startDate > startDate || now > endDate  ) throw new Error('Phiếu giảm giá đã hết hạn') 

        if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
        const rs = await Coupon.create(req.body)
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
//get 1 coupone theo id
const getById = async(req, res) =>{
    try {
        const {cpid} = req.params 
        if(!cpid) throw new Error('Missing input')
        const rs = await Coupon.findById(cpid)
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
//Lấy ra coupon theo mã code
const getByCode = async(req, res) =>{
    try {
        const {code} = req.query 
        if(!code) throw new Error('Missing input')
        const rs = await Coupon.findOne({code})
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
//lấy ra danh sách coupon 
const getAll = async(req, res) =>{
    try {
        const currentDate = new Date()
        const rs = await Coupon.find({end: {$gt: currentDate}})
        const count = rs.length
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công' : 'Thất bại',
            count,
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//cập nhật coupon bằng id
const updateById = async(req, res) =>{
    try {
        const {cpid} = req.params 
        const {code, start, end} = req.body
        if(!cpid || Object.keys(req.body).length == 0) throw new Error('Missing input')
        const checkCode = await Coupon.findOne({code})
        if(checkCode) throw new Error('Mã code đã tồn tại')
        const now = new Date()
        const startDate = new Date(start)
        const endDate = new Date(end)
        if(startDate > endDate || now > endDate) throw new Error('Phiếu đã hêt hạn')
        const rs = await Coupon.findByIdAndUpdate(cpid,req.body, {new: true})
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
//Xóa coupon bằng id
const deleteById = async(req, res) =>{
    try {
        const {cpid} = req.params 
        if(!cpid) throw new Error('Missing input')
        const rs = await Coupon.findByIdAndDelete(cpid)
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Xóa thành công' : 'Xóa thất bại',
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
module.exports = {
    create,
    getAll,
    getById,
    getByCode,
    updateById,
    deleteById
}