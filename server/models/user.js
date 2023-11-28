const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
    },
    role: {
        type: String,
        default: 'User'
    },
    image: {
        type: String
    },
    cart: [
        {
            product: {type: mongoose.Types.ObjectId, ref: 'Product'},
            color: {type: String},
            quantity: {type: Number},
        }
    ],
    address: {
        type: String
    },
    refreshToken: {
        type: String
    },
    wishlist: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    passwordChangeAt: {
        type:String,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    }
})
//hash password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(process.env.AMOUNT_SALT)
    this.password =await bcrypt.hash(this.password, salt)
})
userSchema.methods = {
    isCorrectPassword: async function(password){
        return await bcrypt.compare(password, this.password)
    }
}

module.exports = mongoose.model('User', userSchema)