/* */

/* */
import AT from '../actions/actionTypes'
import client from '../base'
import { createAction } from './utils'

export default {
    signIn: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.SIGN_IN)(payload))
            return client.post('/auth/login', payload)
                .then(response => {
                    dispatch(createAction(AT.SIGN_IN_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.SIGN_IN_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    signUp: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.SIGN_UP)(payload))
            return client.post('/auth/signUp', payload)
                .then(response => {
                    dispatch(createAction(AT.SIGN_UP_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.SIGN_UP_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    logout: () => createAction(AT.LOG_OUT)(),
}

