/* */
import axios from 'axios'

/* */
import AT from '../actions/actionTypes'

//TODO: nginx 설치 후 포트 번호 지우기
const client = axios.create({
    baseURL: 'http://external.cocotutor.ml:3000/auth/',
    timeout: 5000,
})

function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}

export default {
    signIn: (payload) => { // 로그인 직후 유저의 프로젝트 리스트 받기
        return (dispatch) => {
            dispatch(createAction(AT.SIGN_IN)(payload))
            return client.post('/login', payload)
                .then(response => {
                    dispatch(createAction(AT.SIGN_IN_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.SIGN_IN_ERROR)(error))
                })
        }
    },
    logout: (payload) => { // 로그인 직후 유저의 프로젝트 리스트 받기
        return (dispatch) => {
            dispatch(createAction(AT.LOG_OUT)(payload))
            return client.post('/logout', payload)
                .then(response => {
                    dispatch(createAction(AT.LOG_OUT_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.LOG_OUT_ERROR)(error))
                })
        }
    },
}

