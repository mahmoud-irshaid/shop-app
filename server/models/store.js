const mongoose = require('mongoose')
const con = require('../db')


const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    ownerId: {
        type: String,
        required: true
    },

})

const StoreModel = con.stores.model('store', StoreSchema)
module.exports = StoreModel