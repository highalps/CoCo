/* */
import axios from 'axios'

/* */
import AT from '../actions/actionTypes'

// TODO: baseURL 명확히 (api 주소는 어떻게 설계할 것인가?)
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
    getDirectory: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.GET_DIRECTORY)(payload))
            return client.get('/directory') // TODO: api 주소 어떻게 설계?
                .then(response => {
                    dispatch(createAction(AT.GET_DIRECTORY_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_DIRECTORY_ERROR)(error))
                })
        }
    },
}

