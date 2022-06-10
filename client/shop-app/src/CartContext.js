import React, { createContext, useState } from 'react'
import axios from 'axios';

export const CartContext = createContext()

export const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const onAdd = (product, user) => {
        const exist = cartItems.find((x) => x._id === product._id);
        if (exist) {
            let newCart = cartItems.map((x) =>
                x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
            )
            setCartItems(newCart)
            localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
            let newCart = [...cartItems, { ...product, shopperId: user._id, qty: 1 }]
            setCartItems(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };


    const onRemove = (product) => {
        const exist = cartItems.find((x) => x._id === product._id);
        if (exist.qty === 1) {
            let newCart = cartItems.filter((x) => x._id !== product._id);
            setCartItems(newCart)
            localStorage.setItem("cart", JSON.stringify(newCart));

        } else {
            let newCart = cartItems.map((x) =>
                x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
            )
            setCartItems(newCart)

            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };


    const checkOutOrder = (user) => {
        if (window.confirm("checkout Order, store seller will contact you soon.")) {
            axios.put(`${process.env.REACT_APP_API_URL}/checkOutOrder`, { orders: cartItems, user },
                {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                        "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                        "user": JSON.parse(localStorage.getItem('user'))
                    }
                })
                .then(res => {
                    if (res)
                        setCartItems([])
                    localStorage.setItem("cart", JSON.stringify([]));
                })
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, onAdd, onRemove, checkOutOrder }}>
            {props.children}
        </CartContext.Provider>
    )
}
