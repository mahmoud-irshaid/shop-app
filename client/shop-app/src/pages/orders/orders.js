import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav2 from '../../components/nav2';
import Footer from '../../components/footer';


const Orders = () => {
    const { user } = useContext(AuthContext)
    const [orders, setorders] = useState([])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/getOrders`, { user },
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
            <Nav2 />

            <main className='py-5 '>
                <div className="container px-4 px-lg-5" >
                    <h1 className='page-header my-5'>Orders</h1>
                    <table className="table my-5" style={{ border: 'solid 1px #ddd' }}>
                        <thead className="thead-dark text-white" style={{ background: 'black' }}>
                            <tr >
                                <th className='py-4'>item</th>
                                <th className='py-4'>price</th>
                                <th className='py-4'>qty</th>
                            </tr>
                        </thead>
                        <tbody>

                            {orders.map((order, count) => (
                                <tr key={order._id}>
                                    <td className='py-4'>
                                        <Link to={{
                                            pathname: `/show-item/${order._id}`, state: {
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
                                            <p className='text-dark'>{order.name}</p>
                                        </Link>
                                    </td>
                                    <td className='py-4'>$ {order.price}</td>
                                    <td className='py-4'>{order.qty}</td>
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

export default Orders;