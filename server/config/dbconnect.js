const mongoose = require('mongoose')

function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Kết nối db thành công')  
    } catch (error) {
        console.log('Kết nối db thất bại')
    }
}
module.exports = {connect}