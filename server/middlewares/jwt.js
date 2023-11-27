const jwt = require('jsonwebtoken')

const createAccessToken = (uid, role) => jwt.sign({uid, role}, process.env.JWT_SESCRET, {expiresIn: '3d'})
const createRefreshToken = (uid) => jwt.sign({uid}, process.env.JWT_SESCRET, {expiresIn: '7d'})

module.exports = {
    createAccessToken, 
    createRefreshToken
}