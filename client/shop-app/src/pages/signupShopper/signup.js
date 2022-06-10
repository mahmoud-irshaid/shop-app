import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'
import axios from 'axios'
import Style from '../../style/style.module.css'
import Nav2 from '../../components/nav2';
import Footer from '../../components/footer';




const SignUpShopper = () => {

    const [logErr, setlogErr] = useState()
    const [signUser, setsignUser] = useState({
        username: '',
        pass: '',
        email: '',
        phone: '',
        userType: 2
    })

    const { login, logout } = useContext(AuthContext)

    let history = useHistory()

    useEffect(() => {
        logout()
    }, [])


    function log(e) {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/newShopper`, { signUser })
            .then(res => {
                if (res.data.refreshToken && res.data.accessToken && res.data.user) {
                    login(res.data)
                    history.push('/home-shopper')
                }
            })
            .catch(err => err.response.data === 'Username is used before' && setlogErr(err.response.data))
    }


    function logChange(e) {
        setsignUser({ ...signUser, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Nav2 />

            <main className='pb-5 mb-4'>
                <div className={`${Style.container} ${Style.log}`}>
                    <h1 className='fw-bold my-4'>Sign Up Shopper</h1>
                    <form onSubmit={log} className={Style.form}>
                        <div className='my-2'>
                            <label>Username :</label>
                            <input type='text' onChange={(e) => logChange(e)} name='username' className={`${logErr && Style.err} form-control`} required />
                            {logErr && <p className={Style.errMsg}>*{logErr}</p>}
                        </div>
                        <div>
                            <label>Password :</label>
                            <input type='text' minLength='8' className='form-control' onChange={(e) => logChange(e)} name='pass' />
                        </div>
                        <div>
                            <label>Email :</label>
                            <input type='email' className='form-control' onChange={(e) => logChange(e)} name='email' required />
                        </div>
                        <div>
                            <label>Phone :</label>
                            <input type='text' pattern="\d*" maxLength="10" className='form-control' onChange={(e) => logChange(e)} name='phone' />
                        </div>
                        <div>
                            <input type='submit' className='btn btn-primary' />
                        </div>
                    </form>
                    <div className={Style.second}>
                        <p>already have an account ?</p>
                        <a href='/login-shopper'><button>Log in</button></a>
                    </div>
                </div>
            </main >

            <Footer />
        </>
    );
}

export default SignUpShopper;