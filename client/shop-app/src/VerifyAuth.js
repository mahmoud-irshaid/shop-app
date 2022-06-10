import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export const VerifyAuth = ({ children, userType }) => {
    const { isLogged, user } = useContext(AuthContext)
    const history = useHistory()

    const Logged = isLogged && localStorage.getItem('RefToken')
    return Logged && userType === user.userType ? children : history.goBack()
}