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
            return client.get('/api/chat/list')
                .then(response => {
                    console.log('hiihi',response)
                    dispatch(createAction(AT.GET_CHAT_LIST_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_CHAT_LIST_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    getChatMessages: (payload) => {
        return (dispatch) => {
            const { chatId } = payload
            dispatch(createAction(AT.GET_CHAT_MESSAGES)(payload))
            return client.get(`/api/chat/${chatId}`)
                .then(response => {
                    console.log("hihiroo",response.data);
                    dispatch(createAction(AT.GET_CHAT_MESSAGES_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_CHAT_MESSAGES_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
}

