/* */

/* */
import AT from '../actions/actionTypes'
import client from '../base'
import { createAction } from './utils'

export default {
    getDirectory: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.GET_DIRECTORY)(payload))
            const { chatId } = payload
            return client.get(`/api/pad/${chatId}`)
                .then(response => {
                    console.log("RE", response.data)
                    dispatch(createAction(AT.GET_DIRECTORY_SUCCESS)(({ directory: response.data })))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_DIRECTORY_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
}

