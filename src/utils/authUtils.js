/* */
import decode from 'jwt-decode'

/* */
import client from '../redux/base'
import Redux from '../service/reduxService'
import AT from '../redux/actions/actionTypes'

export function setToken(access_token)  {
    if (access_token) {
        localStorage.setItem('token', access_token)
        // client.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    }
    else {
        localStorage.removeItem('token')
       // delete client.defaults.headers.common['Authorization']
    }
}

export function initAuth() {
    delete client.defaults.headers.common['Authorization']
    const token = localStorage.getItem('token')
    if (token) {
        setToken(token)
        const user = decode(token)
        Redux.dispatch({ type: AT.INIT_USER, payload: { user: user.user} })
    }
}