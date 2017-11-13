/* */
import decode from 'jwt-decode'

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
        localStorage.removeItem('token')
        delete client.defaults.headers.common['Authorization']
    }
}

export function initAuth() {
    const token = localStorage.getItem('token')
    if (token) {
        setToken(token)
        let user;

        // 임의로 개발자 도구로 local storage에 token을 저장 했을시 에러 처리
        try {
            user = decode(token)
        } catch (err) {
            localStorage.removeItem('token')
            location.reload()
        }
        Redux.dispatch({ type: AT.INIT_USER, payload: { user: user.user} })
    }
}