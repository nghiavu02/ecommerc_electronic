const Color = require('../models/color')
//Thâm color
const create = async(req, res) =>{
    try {
        if( Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        const rs = await Color.create(req.body)
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
//lấy ra 1 color
const getById = async(req, res) =>{
    try {
        const {cid} = req.params 
        if(!cid) throw new Error('Missing input')
        const rs = await Color.findById(cid)
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
//lấy ra nhiều color
const getAll = async(req, res) =>{
    try {
        const rs = await Color.find()
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
//cập nhật color
const updateById = async(req, res) =>{
    try {
        const {cid} = req.params
        if(!cid || Object.keys(req.body).length == 0) throw new Error('Missing input')
        const rs = await Color.findByIdAndUpdate(cid, req.body, {new: true})
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
//xóa color
const deleteById = async(req, res) =>{
    try {
        const {cid} = req.params
        if(!cid) throw new Error('Missing input')
        const rs = await Color.findByIdAndDelete(cid)
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