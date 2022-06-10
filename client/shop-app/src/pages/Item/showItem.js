import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext'
import { CartContext } from '../../CartContext'
import { useLocation } from 'react-router-dom';
import Nav2 from '../../components/nav2';
import Footer from '../../components/footer';





const ShowItem = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const { onAdd } = useContext(CartContext);
    const [item, setitem] = useState(location.state.item)


    return (
        <>

            <Nav2 />

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
                            <div class="d-flex">
                                <button class="btn btn-outline-dark flex-shrink-0" onClick={() => onAdd(item, user)} type="button">
                                    <i class="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
export default ShowItem;
