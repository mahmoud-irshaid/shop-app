import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'
import axios from 'axios'
import Style from '../../style/style.module.css'
import Nav2 from '../../components/nav2';
import Footer from '../../components/footer';



const LogInShopper = () => {
    const [logErr, setlogErr] = useState()
    const [logErr2, setlogErr2] = useState()
    const [logUser, setlogUser] = useState({
        username: '',
        pass: '',
    })

    const { login, logout } = useContext(AuthContext)

    let history = useHistory()

    useEffect(() => {
        logout()
    }, [])


    function log(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/getShopper`, { logUser })
            .then(res => {
                if (res.data.refreshToken && res.data.accessToken && res.data.user) {
                    login(res.data)
                    history.push('/home-shopper')
                }
            })
            .catch(err => {
                err.response.data === 'Username not found' && setlogErr(err.response.data)
                err.response.data === 'Wrong Password' && setlogErr2(err.response.data)
            })
    }


    function logChange(e) {
        setlogUser({ ...logUser, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Nav2 />

            <main className='pb-5 mb-4'>
                <div className={`${Style.container} ${Style.log}`}>
                    <h1 className='fw-bold my-4'>Log In Shopper</h1>
                    <form onSubmit={log} className={Style.form}>
                        <div className='my-2'>
                            <label>Username :</label>
                            <input type='text' onChange={(e) => logChange(e)} className={`${logErr && Style.err} form-control`} name='username' required />
                            {logErr && <p className={Style.errMsg}>*{logErr}</p>}
                        </div>
                        <div className='my-2'>
                            <label>Password :</label>
                            <input type='password' minLength='8' onChange={(e) => logChange(e)} className={`${logErr2 && Style.err} form-control`} name='pass' required />
                            {logErr2 && <p className={Style.errMsg}>*{logErr2}</p>}
                        </div>
                        <div>
                            <input type='submit' className='btn btn-primary' />
                        </div>
                    </form>
                    <div className={Style.second}>
                        <p>don't have an account ?</p>
                        <a href='/signup-shopper'><button>Sign up</button></a>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default LogInShopper;