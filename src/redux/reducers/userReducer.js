/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { setToken } from '../../utils/authUtils'

const initialState = {
    isLogged: false,
    id: '',
    email: '',
    nickname: '',
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
            const { user } = action.payload
            console.log("A",user)
            return {
                isLogged: true,
                ...user,
            }


        case AT.LOG_OUT: {
            setToken(false)
            return initialState
        }

        default:
            return state;
    }
}

export default userReducer
