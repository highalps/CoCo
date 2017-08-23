/* */
import axios from 'axios'

/* */
import AT from '../actions/actionTypes'

const client = axios.create({
    baseURL: 'http://sopad.ml/api/',
    timeout: 5000,
})

function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}

export default {
    updateDirectory: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.GET_DIRECTORY)(payload))
            return client.get('/directory')
                .then(response => {
                    dispatch(createAction(AT.GET_DIRECTORY_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_DIRECTORY_ERROR)(error))
                })
        }
    },
}

