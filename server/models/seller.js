const mongoose = require('mongoose')
const con = require('../db')


const SellerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    userType: {
        type: Number,
        required: true
    }

})

const SellerModel = con.sellers.model('seller', SellerSchema)
module.exports = SellerModel