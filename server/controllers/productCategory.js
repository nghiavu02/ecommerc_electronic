const ProductCategory = require('../models/productCategory')
//Thâm ProductCategory
const create = async(req, res) =>{
    try {
        if( Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        const rs = await ProductCategory.create(req.body)
        return res.status(200).json({
            success: rs ? true: false,
            message: rs ? 'thàn công': 'thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//lấy ra 1 ProductCategory
const getById = async(req, res) =>{
    try {
        const {pcid} = req.params 
        if(!pcid) throw new Error('Missing input')
        const rs = await ProductCategory.findById(pcid)
        return res.status(200).json({
            success: rs ? true: false,
            message: rs ? 'thàn công': 'thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//lấy ra nhiều ProductCategory
const getAll = async(req, res) =>{
    try {
        const rs = await ProductCategory.find()
        return res.status(200).json({
            success: rs ? true: false,
            message: rs ? 'thàn công': 'thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//cập nhật ProductCategory
const updateById = async(req, res) =>{
    try {
        const {pcid} = req.params
        if(!pcid || Object.keys(req.body).length == 0) throw new Error('Missing input')
        const rs = await ProductCategory.findByIdAndUpdate(pcid, req.body, {new: true})
        return res.status(200).json({
            success: rs ? true: false,
            message: rs ? 'thàn công': 'thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//xóa ProductCategory
const deleteById = async(req, res) =>{
    try {
        const {pcid} = req.params
        if(!pcid) throw new Error('Missing input')
        const rs = await ProductCategory.findByIdAndDelete(pcid)
        return res.status(200).json({
            success: rs ? true: false,
            message: rs ? 'thàn công': 'thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}


module.exports = {
    create,
    getById,
    getAll,
    updateById,
    deleteById
}