/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'

const initialState = {
    nickName: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.SIGN_IN_SUCCESS: {
            return {
                ...state,
                nickName: action.payload.nickName,
            }
        }

        case AT.LOG_OUT_SUCCESS: {
            return initialState
        }

        default:
            return state;
    }
}

export default userReducer
