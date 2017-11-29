/* */
import Immutable from 'immutable'
import _ from 'lodash'

/* */
import AT from '../actions/actionTypes'
import { setToken } from '../../utils/authUtils'

const initialState = {
    directory: Immutable.Map(),
}

// rename json key
function changekey(obj) {
    var directory = JSON.stringify(obj)
    directory.replace('name', 'title')
    directory.replace('contents', 'children')
    return JSON.parse(directory)
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_DIRECTORY_SUCCESS: {
            const { directory } = action.payload
            return {
                ...state,
                directory: Immutable.fromJS(directory.dir),
            }
        }

        default:
            return state;
    }
}

export default userReducer
