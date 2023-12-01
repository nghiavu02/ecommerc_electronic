const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const data = require('../../data/data2.json')
const dataCategory = require('../../data/cate_brand')
const ProductCategory = require('../models/productCategory')
const slugify = require('slugify')

const fn = async(product)=>{
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 1000),
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join(''))/100),
        category: product?.category,
        quantity: Math.round(Math.random()* 1000),
        sold:  Math.round(Math.random()* 1000),
        images: product?.images,
        color: product?.variants?.find(item => item.label === 'Color')?.variants[0],
        thumb: product?.thumb,
        totalRating: Math.round(Math.random() * 5)

    })
}
const insertProduct = asyncHandler(async(req, res)=>{
    const promises = []
    for(let product of data) promises.push(fn(product))
    await Promise.all(promises)
    console.log(promises)
    return res.json('Thêm thành công')
})

//insert product category
const fn2 = async(cate)=>{
    const slug = slugify(cate?.cate) + Math.round(Math.random() * 1000);
    await ProductCategory.create({
        name: cate?.cate,
        brand: cate?.brand,
        slug: slug
    })
}
const insertCategory = asyncHandler(async(req, res)=>{
    const promises = []
    for(let cate of dataCategory) promises.push(fn2(cate))
    // await Promise.all(promises)
    // console.log(promises)
    return res.json('Thêm thành công')
})

module.exports = {insertProduct,insertCategory}