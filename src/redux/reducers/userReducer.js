/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { setToken } from '../../utils/authUtils'

const initialState = {
    isLogged: false,
    userID: '',
    email: '',
    nickName: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.SIGN_IN_SUCCESS: {
            const { access_token, user } = action.payload
            setToken(access_token)
            return {
                isLogged: true,
                ...user,
            }
        }

        case AT.INIT_USER:
            return {
                ...state,
                isLogged: true,
            }


        case AT.LOG_OUT_SUCCESS: {
            setToken(false)
            return initialState
        }

        default:
            return state;
    }
}

export default userReducer
