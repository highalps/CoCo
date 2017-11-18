/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'

const initialState = {
    chatList: Immutable.List(),
    chatMessages: Immutable.List(),
    currentChatId: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_CHAT_LIST_SUCCESS:
            return {
                ...state,
                chatList: Immutable.fromJS(
                    action.payload.list
                ).sortBy(chat => chat.get('date'))
            }

        case AT.SHOW_CHAT_MESSAGE:
            return {
                ...state,
                currentChatId: action.payload.chatId
            }

        case AT.GET_CHAT_MESSAGES:
            console.log(action.payload)
            return {
                ...state,

            }

        default:
            return state;
    }
}

export default userReducer
