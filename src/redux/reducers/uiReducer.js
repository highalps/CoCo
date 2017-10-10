/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { setToken } from '../../utils/authUtils'

const initialState = {
    uiState: Immutable.fromJS({
        chatButton: true,
        chatList: false,
        chatMessage: false,
    })
}

const userReducer = (state = initialState, action) => {
    const { uiState } = state

    switch (action.type) {
        case AT.SHOW_CAHT_BUTTON:
            return {
                uiState: uiState
                    .set('chatList', false)
                    .set('chatMessage', false)
                    .set('chatButton', true)
            }

        case AT.SHOW_CAHT_LIST:
            return {
                uiState: uiState
                    .set('chatList', true)
                    .set('chatMessage', false)
                    .set('chatButton', false)
            }

        case AT.SHOW_CAHT_MESSAGE:
            return {
                uiState: uiState
                    .set('chatList', false)
                    .set('chatMessage', true)
                    .set('chatButton', false)
            }


        default:
            return state;
    }
}

export default userReducer
