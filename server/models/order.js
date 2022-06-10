const mongoose = require('mongoose')
const con = require('../db')


const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shopperId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

const OrderModel = con.orders.model('order', OrderSchema)
module.exports = OrderModel