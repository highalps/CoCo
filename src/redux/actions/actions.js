/* */
import axios from 'axios'

/* */
import AT from '../actions/actionTypes'
import Redux from '../../service/reduxService'

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
        Redux.dispatch(createAction(AT.GET_DIRECTORY))
        client.get('/directory')
            .then(response => {
                Redux.dispatch(createAction(AT.GET_DIRECTORY_SUCCESS)(response))
            })
            .catch(error => {
                Redux.dispatch(createAction(AT.GET_DIRECTORY_ERROR)(error))
            })
    }
}

