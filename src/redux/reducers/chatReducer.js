/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import chatSocket from '../../service/chatSocketService'

const initialState = {
    classNum:-1,
    isWriter:false,
    status:1,
    chatList: Immutable.List(),
    currentChatId: '',
    chat: Immutable.fromJS({
        messages: Immutable.List(),
        mode: '',
        person: '',
    }),
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.UPDATE_STATUS:
            return {
                ...state,
                status:action.payload
            }
        case AT.GET_CHAT_LIST_SUCCESS:
            return {
                ...state,
                chatList: Immutable.fromJS(action.payload.list).sortBy(chat => chat.get('date')),
            }

        case AT.SHOW_CHAT_MESSAGE:
            return {
                ...state,
                currentChatId: action.payload.chatId
            }

        case AT.GET_CHAT_MESSAGES_SUCCESS:
            const { classNum, status, isWriter, mode, log, nickname } = action.payload
            console.log('chat status', action.payload)
            chatSocket.join(state.currentChatId)
            return {
                ...state,
                classNum:classNum,
                status:status,
                isWriter:isWriter,
                chat: state.chat
                    .set('mode', mode)
                    .set('person', nickname)
                    .set('messages', Immutable.fromJS(log).sortBy(chat => chat.get('date')))
            }

        case AT.UPDATE_MESSAGE:
            const { message } = action.payload
            const { chat } = state
            return {
                ...state,
                chat: chat.set('messages', chat.get('messages').push(Immutable.fromJS(message))),
            }

        case AT.SHOW_CHAT_LIST:
            return {
                ...state,
                chat: state.chat.clear(),
            }

        case AT.CLOSE_CHAT:
            return initialState

        default:
            return state;
    }
}

export default chatReducer
