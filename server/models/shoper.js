const mongoose = require('mongoose')
const con = require('../db')


const ShopperSchema = new mongoose.Schema({
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

const ShopperModel = con.shoppers.model('shopper', ShopperSchema)
module.exports = ShopperModel