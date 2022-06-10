import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/footer';
import Nav from '../../components/nav';

const Revenues = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    const [orders, setorders] = useState([])
    const [store, setstore] = useState(location.state.store)
    const itemsPrice = orders.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;


    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/getRevenues`, { store, user },
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.parse(localStorage.getItem('user'))
                }
            })
            .then(res => {
                setorders(res.data)
            })
    }, [])


    return (
        <>
            <Nav />

            <main className='py-5 '>


                <div className="container px-4 px-lg-5" >
                    <h1 className='page-header  my-5'>Total Revenues: $ {totalPrice}  </h1>
                    <h1 className='page-header my-5' >Orders</h1>

                    <table className="table my-5" style={{ border: 'solid 1px #ddd' }}>
                        <thead className="thead-dark text-white" style={{ background: 'black' }}>
                            <tr >
                                <th className='py-4'>item</th>
                                <th className='py-4'>price</th>
                                <th className='py-4'>qty</th>
                                <th className='py-4'>shopper</th>
                            </tr>
                        </thead>
                        <tbody>

                            {orders.map((order, count) => (
                                <tr key={order._id}>
                                    <td className='py-4 px-lg-5'>
                                        <Link to={{
                                            pathname: `/item/${order._id}`, state: {
                                                item: {
                                                    _id: order._id,
                                                    name: order.name,
                                                    price: order.price,
                                                    description: order.description,
                                                    storeName: order.storeName,
                                                    storeId: order.storeId
                                                }
                                            }
                                        }}>
                                            {order.name}
                                        </Link>
                                    </td>
                                    <td className='py-4 px-lg-5'>{order.price}</td>
                                    <td className='py-4 px-lg-5'>{order.qty}</td>
                                    <td className='py-4'>{order.shopperId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Revenues;