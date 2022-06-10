import React, { createContext, useState, useLayoutEffect, useCallback } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = (props) => {

    const [auth, setauth] = useState({ user: null })
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('user')) || null)



    const setLocal = () => {
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    }



    const login = useCallback((token) => {
        setauth(!!token)
        setuser(token.user)

        localStorage.setItem(
            "AccToken",
            JSON.stringify(token.accessToken)
        );
        localStorage.setItem(
            "RefToken",
            JSON.stringify(token.refreshToken)
        );
        localStorage.setItem(
            "user",
            JSON.stringify({
                ...token.user,
            })
        );
    }, []);


    const logout = useCallback(() => {  /// remove from backend 
        setauth(null);
        localStorage.removeItem('AccToken');
        localStorage.removeItem('RefToken');
        localStorage.removeItem('user');

        axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, {
            headers: {
                "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
            }
        }
        ).then(res => console.log(res))
    }, []);


    useLayoutEffect(() => {
        let userType
        if (user && user.userType === 1)
            userType = 'Seller'
        else if (user && user.userType === 2)
            userType = 'Shopper'
        else
            userType = 'Shopper'


        axios.post(`${process.env.REACT_APP_API_URL}/checkAuth${userType}`, { user }, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
                "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
                "user": JSON.parse(localStorage.getItem('user'))
            }
        }
        ).then(res => {
            if (res.data === 'not Authenticated')
                logout()
            else {
                if (res.data.accessToken)
                    login({
                        user: res.data.userFresh,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    })
            }
        })
    }, [])



    return (
        <AuthContext.Provider value={{ isLogged: auth, login, logout, user, setuser, setLocal }}>
            {props.children}
        </AuthContext.Provider>
    )
}
