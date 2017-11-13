/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'

const initialState = {

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_CHAT_LIST_SUCCESS: {
            return {

            }
        }

        default:
            return state;
    }
}

export default userReducer
