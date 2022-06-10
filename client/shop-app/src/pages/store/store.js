import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/footer';
import Nav from '../../components/nav';





const Store = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const [store, setstore] = useState(location.state.store)
    const [items, setitems] = useState([])


    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/getItems`, { store: store._id, user },
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.parse(localStorage.getItem('user'))
                }
            })
            .then(res => {
                setitems(res.data)
            })
    }, [])



    const deleteItem = (item) => {
        if (window.confirm("Are you sure to delete this item!")) {
            axios.post(`${process.env.REACT_APP_API_URL}/deleteItem`, { item, user },
                {
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                        "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                        "user": JSON.parse(localStorage.getItem('user'))
                    }
                })
                .then(res => window.location.reload())
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Nav />
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">{store.name}</h1>
                        <p className="lead fw-normal text-white-50 mb-0">{store.category}</p>
                        <p className="lead fw-normal text-white-50 mb-0">{store.description}</p>
                    </div>
                </div>
            </header>
            <main className='py-5'>
                <div className='container text-center my-5'>
                    <Link to={{ pathname: `/create-item`, state: { store: store } }}><button className='btn btn-primary px-4 mx-5 my-5'>Create item</button></Link>
                    <Link to={{ pathname: `/revenues`, state: { store: store } }}> <button className='btn btn-primary px-4 mx-5'>Orders & Revenues</button></Link>
                </div>
                <div className='text-center' style={{ overflowX: 'hidden' }}>
                    <h2 className="display-5 fw-bolder mb-5">Items</h2>

                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center mb-5 mx-5">

                        {items.map((item, count) => (


                            <div className="col mb-5" key={item.name}>
                                <div className="card h-100">
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    <div className="card-body p-4">
                                        <Link to={{ pathname: `/item/${item._id}`, state: { item } }}>
                                            <div className="text-center">
                                                <h5 className="fw-bolder text-dark text-decoration-none">{item.name}</h5>
                                                <p className="fw-bold pt-4 text-dark text-decoration-none">$ {item.price}</p>
                                            </div>
                                        </Link>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="btn btn-danger mt-3" onClick={() => deleteItem(item)}>Delete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}

export default Store;