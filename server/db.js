const mongoose = require('mongoose');

mongoose.connect(process.env.SELLERS_DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('connected'))
    .catch((err) => console.log(err))


mongoose.shoppers = mongoose.createConnection(process.env.SHOPPERS_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.stores = mongoose.createConnection(process.env.STORES_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.items = mongoose.createConnection(process.env.ITEMS_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.orders = mongoose.createConnection(process.env.ORDERS_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })


mongoose.sellers = mongoose.createConnection(process.env.SELLERS_DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })


module.exports = mongoose