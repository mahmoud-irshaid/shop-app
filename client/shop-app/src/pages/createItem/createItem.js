import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext'
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/nav';
import Footer from '../../components/footer';

const CreateItem = () => {
    const { user } = useContext(AuthContext)
    let history = useHistory()
    const location = useLocation()
    const [store, setstore] = useState(location.state.store)

    const [item, setitem] = useState({
        name: '',
        category: '',
        description: '',
        storeId: store._id,
        storeName: store.name,

    })

    function handleSubmit(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/createItem`, { item, user },
            {
                headers: {
                    "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                    "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                    "user": JSON.stringify(localStorage.getItem('user'))
                }
            })
            .then(res => {
                if (res) history.goBack()
            })
            .catch(err => {
                console.log(err);
            })
    }


    function itemChange(e) {
        setitem({ ...item, [e.target.name]: e.target.value })
    }


    return (
        <>

            <Nav />

            <header>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center">
                        <h1 className="display-4 fw-bolder  py-4">Create Item</h1>
                    </div>
                </div>
            </header>

            <main className='container mb-5 pb-5 px-5' >
                <form form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className='my-5'>
                            <label>Name :</label>
                            <input type='text' className="form-control" placeholder="Add Name" onChange={(e) => itemChange(e)} name='name' required />
                        </div>
                        <div className='my-5'>
                            <label>Price :</label>
                            <input type='number' className="form-control" placeholder="Add Price" onChange={(e) => itemChange(e)} name='price' required />
                        </div>
                        <div className='my-5'>
                            <label>description :</label>
                            <textarea type='text' className="form-control" placeholder="Add Description" onChange={(e) => itemChange(e)} name='description' required />
                        </div>
                        <div className='my-4 text-center'>
                            <button type="submit" className="btn btn-primary px-4">Submit</button>
                        </div>
                    </div>
                </form>
            </main>

            <Footer />
        </>);
}

export default CreateItem;