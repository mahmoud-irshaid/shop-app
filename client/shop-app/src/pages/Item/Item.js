import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/footer';
import Nav from '../../components/nav';





const Item = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const [item, setitem] = useState(location.state.item)


    return (
        <>
            <Nav />

            <section className="py-5 my-4">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." /></div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-bolder">{item.name}</h1>
                            <div className="fs-5 mb-5">
                                <span>$ {item.price}</span>
                            </div>
                            <p className="lead">{item.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Item;