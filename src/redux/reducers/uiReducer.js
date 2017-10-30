/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { setToken } from '../../utils/authUtils'

const initialState = {
    uiState: Immutable.fromJS({
        chatList: false,
        chatMessage: false,
    })
}

const userReducer = (state = initialState, action) => {
    const { uiState } = state

    switch (action.type) {
        case AT.CLOSE_CHAT:
            return {
                uiState: uiState
                    .set('chatList', false)
                    .set('chatMessage', false)
            }

        case AT.SHOW_CHAT_LIST:
            return {
                uiState: uiState
                    .set('chatList', true)
                    .set('chatMessage', false)
            }

        case AT.SHOW_CHAT_MESSAGE:
            return {
                uiState: uiState
                    .set('chatList', false)
                    .set('chatMessage', true)
            }


        default:
            return state;
    }
}

export default userReducer
