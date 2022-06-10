require('dotenv/config')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const { createAccToken, createRefToken, validateTokens, logout, IsSeller, IsShopper } = require('./jwt')

const SellerModel = require('./models/seller')
const ShopperModel = require('./models/shoper')
const StoreModel = require('./models/store')
const ItemModel = require('./models/item')
const OrderModel = require('./models/order')


const app = express()

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())





// seller functions


// sign up seller

app.post('/newSeller', (req, res) => {
    let user = req.body.signUser
    const username = user.username
    const pass = user.pass

    SellerModel.findOne({ username })                    //check if username used 
        .then((result) => {
            if (result)
                res.status(403).send('Username is used before')
            else {
                bcrypt.hash(pass, 10).then((hash) => {
                    const newuser = new SellerModel({ ...user, pass: hash })
                    newuser.save((err, rez) => {

                        const accessToken = createAccToken(user)
                        const refreshToken = createRefToken(user)

                        rez = Object.assign(rez, { pass: undefined })

                        res.send({ user: rez, accessToken, refreshToken })
                    })

                })
            }
        }).catch(err => console.log(err))
})




// log in seller

app.post('/getSeller', async (req, res) => {
    let user = req.body.logUser
    const username = user.username
    const pass = user.pass

    SellerModel.findOne({ username })                    //check if username is found
        .then((user) => {
            if (!user)
                return res.status(403).send("Username not found");
            else {
                bcrypt.compare(pass, user.pass).then(match => {
                    if (!match)
                        res.status(403).send('Wrong Password')
                    else {
                        const accessToken = createAccToken(user)
                        const refreshToken = createRefToken(user)

                        user = Object.assign(user, { pass: undefined })

                        res.send({ user, accessToken, refreshToken })
                    }
                })
            }
        })
        .catch(err => res.send('something went wrong'))
})




// refresh auth info seller

app.post('/checkAuthSeller', [validateTokens, IsSeller], async (req, res) => {
    const user = req.body.user
    await SellerModel.findOne({ username: user.username })
        .then((result) => {
            result = Object.assign(result, { pass: undefined })
            res.send({
                userFresh: result,
                accessToken: req.newAcc,
                refreshToken: req.newRef,
            })
        })
        .catch(err => res.send(err))
})




// create new store

app.post('/createStore', [validateTokens, IsSeller], (req, res) => {
    const store = req.body.store
    const NewStore = StoreModel(store)
    NewStore.save()
        .then(result => res.send(result))
        .catch(err => res.send(err))
})



// get seller stores

app.post('/myStores', [validateTokens, IsSeller], async (req, res) => {
    const user = req.body.user
    await StoreModel.find({ ownerId: user._id })
        .then(result => res.send(result))
        .catch(err => res.send(err))
})



// create new item

app.post('/createItem', [validateTokens, IsSeller], (req, res) => {
    const item = req.body.item
    const NewItem = ItemModel(item)
    NewItem.save()
        .then(result => res.send(result))
        .catch(err => res.send(err))
})




// get store items

app.post('/getItems', [validateTokens, IsSeller], async (req, res) => {
    const store = req.body.store
    await ItemModel.find({ storeId: store })
        .then(result => res.send(result))
        .catch(err => res.send(err))
})




// delete item from store

app.post('/deleteItem', [validateTokens, IsSeller], async (req, res) => {
    const item = req.body.item
    await ItemModel.findOneAndDelete({ _id: item._id }).exec()
        .then(result => res.send(result))
        .catch(err => res.send(err))
})




// get store orders and revenues

app.post('/getRevenues', [validateTokens, IsSeller], async (req, res) => {
    const store = req.body.store
    await OrderModel.find({ storeId: store._id })
        .then(result => res.send(result))
        .catch(err => res.send(err))
})







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// shopper functions


// sign up shopper

app.post('/newShopper', (req, res) => {
    let user = req.body.signUser
    const username = user.username
    const pass = user.pass

    ShopperModel.findOne({ username })                    //check if username used 
        .then((result) => {
            if (result)
                res.status(403).send('Username is used before')
            else {
                bcrypt.hash(pass, 10).then((hash) => {
                    const newuser = new ShopperModel({ ...user, pass: hash })
                    newuser.save((err, rez) => {

                        const accessToken = createAccToken(user)
                        const refreshToken = createRefToken(user)

                        rez = Object.assign(rez, { pass: undefined })

                        res.send({ user: rez, accessToken, refreshToken })
                    })

                })
            }
        }).catch(err => console.log(err))
})




// log in shopper

app.post('/getShopper', async (req, res) => {
    let user = req.body.logUser
    const username = user.username
    const pass = user.pass

    ShopperModel.findOne({ username })                    //check if username is found
        .then((user) => {
            if (!user)
                return res.status(403).send("Username not found");
            else {
                bcrypt.compare(pass, user.pass).then(match => {
                    if (!match)
                        res.status(403).send('Wrong Password')
                    else {
                        const accessToken = createAccToken(user)
                        const refreshToken = createRefToken(user)


                        user = Object.assign(user, { pass: undefined })

                        res.send({ user, accessToken, refreshToken })
                    }
                })
            }
        })
        .catch(err => res.send('something went wrong'))
})




// refresh auth info shopper

app.post('/checkAuthShopper', [validateTokens, IsShopper], async (req, res) => {
    const user = req.body.user
    await ShopperModel.findOne({ username: user.username })
        .then((result) => {
            result = Object.assign(result, { pass: undefined })
            res.send({
                userFresh: result,
                accessToken: req.newAcc,
                refreshToken: req.newRef,
            })
        })
        .catch(err => res.send(err))
})



// get stores

app.post('/Stores', [validateTokens, IsShopper], async (req, res) => {
    const user = req.body.user
    await StoreModel.find()
        .then(result => res.send(result))
        .catch(err => res.send(err))
})



// get shopper orders

app.post('/getOrders', [validateTokens, IsShopper], async (req, res) => {
    const user = req.body.user
    await OrderModel.find({ shopperId: user._id })
        .then(result => res.send(result))
        .catch(err => res.send(err))
})




// check out order from cart

app.put('/checkOutOrder', [validateTokens, IsShopper], async (req, res) => {
    const user = req.body.user
    const orders = req.body.orders
    try {
        const NewOrder = await OrderModel.insertMany(orders);
        if (NewOrder)
            res.status(200).send('Orders added')

    } catch { err => console.log(err) }
})




// log out

app.post('/logout', (req, res) => {
    const RefToken = req.headers["x-refresh-token"]
    logout(RefToken)
})





app.get('/', (req, res) => {
    res.send('at Home')
})

app.listen(process.env.PORT || 3001)