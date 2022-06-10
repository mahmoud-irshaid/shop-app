const mongoose = require('mongoose')
const con = require('../db')


const ItemSchema = new mongoose.Schema({
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
    storeName: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    }
})

const ItemModel = con.items.model('item', ItemSchema)
module.exports = ItemModel