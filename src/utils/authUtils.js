/* */

/* */
import client from '../redux/base'
import Redux from '../service/reduxService'
import AT from '../redux/actions/actionTypes'

export function setToken(access_token)  {
    if (access_token) {
        localStorage.setItem('token', access_token)
        client.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    }
    else {
        delete client.defaults.headers.common['Authorization']
    }
}

export function initAuth() {
    if (localStorage.token) {
        setToken(localStorage.token)
       Redux.dispatch({ type: AT.INIT_USER })
    }
}