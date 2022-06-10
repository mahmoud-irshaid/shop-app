import React, { useContext } from 'react';
import { CartContext } from '../CartContext'

const Nav2 = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/home-shopper">Shop-app</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/home-shopper">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/orders">Orders</a></li>
                    </ul>
                    <form className="d-flex">
                        <a className="btn btn-outline-dark" href='/cart'>
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{useContext(CartContext).cartItems.length}</span>
                        </a>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Nav2;