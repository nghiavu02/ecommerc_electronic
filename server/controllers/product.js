const Product = require('../models/product')
const slugify = require('slugify')
//Thêm sản phẩm bởi admin
const create = async(req, res)=>{
    try {
        if(Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
        const rs = await Product.create(req.body)
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Cập nhật sản phẩm thành công' : 'Cập nhật sản phẩm thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//Lấy 1 sản phẩm theo id
const getById = async(req, res)=>{
    try {
        const {pid} = req.params
        const rs = await Product.findById(pid)
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? ' thành công' : ' thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//lấy danh sách sản phẩm
const getAll = async(req, res, next) =>{
    try {
        const input = {...req.query}
        const mang = ['page', 'limit', 'sort', 'fields']
        mang.forEach(item => delete input[mang])
        let inputString = JSON.stringify(input)
        inputString = inputString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        let inputs = JSON.parse(inputString)
        if(input?.title) inputs.title = {$regex: input.title, $options: 'i'}
        let product = Product.find(inputs)

        //sort
        if(req.query?.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            product =  product.sort(sortBy)
        }
        //fields
        if(req.query?.fields){
            const fields = req.query.fields.split(',').join(' ')
            product = product.select(fields)
        }
        //pagination
        const limit = req.query.limit * 1 || 20
        const page = req.query.page * 1 || 1
        const skip = (page -1) * limit
        product.skip(skip).limit(limit)

        product.then(rs =>{
            return res.status(200).json({
                success: rs ? true : false,
                message: rs ? 'thành công': 'thất bại',
                data: rs
            })
        }).catch(next)
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//Cập nhật sản phẩm bởi admin
const updateById = async(req, res)=>{
    try {
        const {pid} = req.params
        if(!pid || Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
        const rs = await Product.findByIdAndUpdate(pid,req.body, {new: true})
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Cập nhật sản phẩm thành công' : 'Cập nhật sản phẩm thất bại',
            data: rs ? rs : null
        })
    } catch (error) {
        res.status(504).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//Xóa sản phẩm bởi admin
const deleteById = async(req, res) =>{
    try {
        const {pid} = req.params
        if(!pid) throw new Error('Missing input')
        const rs = await Product.findByIdAndDelete(pid)
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'thành công': 'thất bại',
            data: rs
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ` Có lỗi xảy ra: ${error.message}`
        })
    }
}
//Thêm và update đánh giá
const rating = async(req, res) =>{
    try {
        const {uid} = req.user
        const {star, comment, pid} = req.body
        if(!pid || !uid) throw new Error('Missing inputs')
        const product = await Product.findById(pid).select('ratings')
        const checkUser = product.ratings.find(item => item.postedBy.toObject() == uid)
        if(checkUser){
            //update
            await Product.updateOne({ratings: {$elemMatch: {postedBy: uid}}}, {$set : { 'ratings.$.star': star, 'ratings.$.comment': comment}})
        }
        else{
            //thêm mới
            await Product.findByIdAndUpdate(pid, { $push : {star, comment, postedBy: uid}}, {new: true})
        }
        const rs = await Product.findById(pid)
        const countRating = rs.ratings.length
        const sumStart = rs.ratings.reduce((sum, item) => item.star + sum, 0)
        rs.totalRating = Math.ceil(sumStart / countRating / 10) * 10
        rs.save()
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thành công': 'Thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500),json({
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
    deleteById,
    rating
}