const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUploader = require('./config/cloudinary.config')

const app = express()
app.use(cors({
    origin: process.env.URL_CLIENT,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
const port = process.env.PORT || 3000
const db = require('./config/dbconnect')
const route = require('./routes/index')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
db.connect()
app.use(cookieParser())
route(app)


app.listen(port, ()=>{
    console.log(`server running on the port ${port}`)
})