/* */

/* */
import AT from '../actions/actionTypes'
import client from '../base'

function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}

export default {
    getChatList: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.GET_CHAT_LIST)(payload))
            return client.get('/api/chat/list', payload)
                .then(response => {
                    dispatch(createAction(AT.GET_CHAT_LIST_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_CHAT_LIST_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
}

