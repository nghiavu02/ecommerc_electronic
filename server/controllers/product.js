const Product = require('../models/product')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
//Thêm sản phẩm bởi admin
const create = async(req, res)=>{
    try {
        if(Object.keys(req.body).length == 0) throw new Error('Missing inputs')
        if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
        const rs = await Product.create(req.body)
        return res.status(200).json({
            success: rs ? true : false,
            message: rs ? 'Thêm sản phẩm thành công' : 'Thêm sản phẩm thất bại',
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
const getAll = asyncHandler(async (req, res, next) => {
    const queries = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(item => delete queries[item])
    //advanced filtering 
    let queryString = JSON.stringify(queries)
    //tìm chỗi gte thay thế bằng => $get
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const formatedQueries = JSON.parse(queryString)

    //filtering
    //regex: , 'i': không phân biệt hoa thường
    if (queries?.name) formatedQueries.name = { $regex: queries.name, $options: 'i' }
    let queryCommand = Product.find(formatedQueries)
    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }
    else {
        queryCommand = queryCommand.sort('-createAt')
    }
    //Field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    //Pagination
    const page = +req.query.page * 1 || 1;
    const limit = +req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);
    //  Execute query
    queryCommand.then(async (response) => {
        const counts = await Product.find(formatedQueries).countDocuments()
        res.status(200).json({
            success: response ? true : false,
            message: response ? "Lấy ra sản phẩm" : "lấy sản phẩm thất bại",
            counts,
            page,
            products: response ? response : null,
        })
    }).catch(next)
})
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
        const {star, comment , pid} = req.body
        if(!uid || !pid || Object.keys(req.body).length == 0) throw new Error('Missing input')
        const product = await Product.findById(pid)
        const checkRating = product.ratings.find(item => item.postedBy.toString() == uid)
        if(checkRating){
            //update rating
            await Product.updateOne({ratings: {$elemMatch: {postedBy: uid}}}, {$set: {'ratings.$.star': star, 'ratings.$.comment': comment}})
        }   
        else{
            //push rating
            await Product.findByIdAndUpdate(pid, {$push: {star, comment, postedBy: uid}})
        }
        const rs = await Product.findById(pid)
        const countRating = rs.ratings.length
        const sumStar = rs.ratings.reduce((sum, item)=> item.star + sum, 0)
        rs.totalRating = Math.ceil(sumStar*10/countRating) /10
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
//Upload Image
const upload = async(req, res) =>{
    try {
        console.log(req.files)
        const {pid} = req.params
        if(!req.files) throw new Error('Missing iniput')
        const rs = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(item => item.path)}}}, {new: true})
        return res.status(200).json({
            succcess: rs ?true : false,
            message: rs ? 'Thành công': 'Thất bại',
            data: rs
        })
    } catch (error) {
        res.status(500).json({
            success: true,

            messsage: ` CÓ lỗi xảy ra: ${error.message}`
        })
    }
}

module.exports = {
    create,
    getById,
    getAll,
    updateById,
    deleteById,
    rating,
    upload
}