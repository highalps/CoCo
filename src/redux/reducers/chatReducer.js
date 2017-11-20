/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import chatSocket from '../../service/chatSocketService'

const initialState = {
    chatList: Immutable.List(),
    currentChatId: '',
    chat: Immutable.fromJS({
        messages: Immutable.List(),
        mode: '',
    }),
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_CHAT_LIST_SUCCESS:
            return {
                ...state,
                chatList: Immutable.fromJS(action.payload.list).sortBy(chat => chat.get('date'))
            }

        case AT.SHOW_CHAT_MESSAGE:
            return {
                ...state,
                currentChatId: action.payload.chatId
            }

        case AT.GET_CHAT_MESSAGES_SUCCESS:
            const { mode, log } = action.payload
            chatSocket.join(state.currentChatId)
            return {
                ...state,
                chat: state.chat
                    .set('mode', mode)
                    .set('messages', Immutable.fromJS(log).sortBy(chat => chat.get('date')))
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

export default userReducer
