/* */

/* */
import AT from '../actions/actionTypes'
import client from '../base'
import { createAction } from './utils'

export default {
    getChatList: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.GET_CHAT_LIST)(payload))
            return client.get('/api/chat/list')
                .then(response => {
                    dispatch(createAction(AT.GET_CHAT_LIST_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_CHAT_LIST_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    getMessages: (payload) => {
        return (dispatch) => {
            const { chatId } = payload
            dispatch(createAction(AT.GET_CHAT_MESSAGES)(payload))
            return client.get(`/api/chat/${chatId}`)
                .then(response => {
                    dispatch(createAction(AT.GET_CHAT_MESSAGES_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_CHAT_MESSAGES_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    createMessage: (payload) => {
        return (dispatch) => {
            const { chatId, mode, nickname, message } = payload
            dispatch(createAction(AT.CREATE_CHAT_MESSAGE)(payload))
            return client.put(`/api/chat/${chatId}`, {mode, nickname, message})
                .then(response => {
                    dispatch(createAction(AT.CREATE_CHAT_MESSAGE_SUCCESS)({ message: response.data }))
                })
                .catch(error => {
                    dispatch(createAction(AT.CREATE_CHAT_MESSAGE_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    setStatus:(payload) => createAction(AT.UPDATE_STATUS)(payload),
    updateMessage: (payload) => createAction(AT.UPDATE_MESSAGE)(payload)
}

