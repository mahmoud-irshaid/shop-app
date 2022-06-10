import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext'
import { CartContext } from '../../CartContext'
import Nav2 from '../../components/nav2';
import Footer from '../../components/footer';



const Cart = () => {
    const { user } = useContext(AuthContext)

    const { cartItems, onAdd, onRemove, checkOutOrder } = useContext(CartContext);
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    return (
        <>

            <Nav2 />

            <header>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center">
                        <h1 className="display-4 fw-bolder  py-4">Cart Items</h1>
                    </div>
                </div>
            </header>

            <div className="container mb-5 text-center fw-bold">
                {cartItems.length === 0 && <main><h3>Cart is empty</h3></main>}
                {cartItems.map((item) => (
                    <div key={item.id} className="border-bottom mb-4">
                        <div className=""><h3>{item.name}</h3></div>
                        <div className="my-5">
                            <button onClick={() => onRemove(item)} className="btn btn-default fw-bolder border px-4">
                                -
                            </button>{' '}
                            <span className=" mx-5">
                                {item.qty} x ${item.price.toFixed(2)}
                            </span>
                            <button onClick={() => onAdd(item)} className="btn btn-default fw-bolder border px-4">
                                +
                            </button>
                        </div>

                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <div className="row mx-5 px-5 my-3">
                            <span className="col-md-6">Items Price</span>
                            <span className="fw-normal col-md-6">${itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="row mx-5 px-5 my-3">
                            <span className="col-md-6">Tax Price</span>
                            <span className="fw-normal col-md-6">${taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="row mx-5 px-5 my-3">
                            <span className="col-md-6">Shipping Price</span>
                            <span className="fw-normal col-md-6">
                                ${shippingPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="row mx-5 px-5 my-4">
                            <span className="col-md-6">
                                <strong>Total Price</strong>
                            </span>
                            <span className="col-md-6">
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </span>
                        </div>
                        <hr />
                        <div className="mt-5 pb-5">
                            <button onClick={() => checkOutOrder(user)} className='btn btn-primary'>
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />

        </>
    );
}

export default Cart;