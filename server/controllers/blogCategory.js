const BlogCategory = require('../models/blogCategory')
//Thâm BlogCategory
const create = async(req, res) =>{
    try {
        if( Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        const rs = await BlogCategory.create(req.body)
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
//lấy ra 1 BlogCategory
const getById = async(req, res) =>{
    try {
        const {bcid} = req.params 
        if(!bcid) throw new Error('Missing input')
        const rs = await BlogCategory.findById(bcid)
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
//lấy ra nhiều BlogCategory
const getAll = async(req, res) =>{
    try {
        const rs = await BlogCategory.find()
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
//cập nhật BlogCategory
const updateById = async(req, res) =>{
    try {
        const {bcid} = req.params
        if(!bcid || Object.keys(req.body).length == 0) throw new Error('Missing input')
        const rs = await BlogCategory.findByIdAndUpdate(bcid, req.body, {new: true})
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
//xóa BlogCategory
const deleteById = async(req, res) =>{
    try {
        const {bcid} = req.params
        if(!bcid) throw new Error('Missing input')
        const rs = await BlogCategory.findByIdAndDelete(bcid)
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