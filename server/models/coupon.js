const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        type:String,        
    },
    code:{
        type:String,
        required:true,
        unique:true,
        uppercase: true
    },
    discount: {
        type: Number,
        default: 0
    },
    start:{
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date,
        default: Date.now() + 10 * 24 * 60 * 60 * 1000
    }
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);