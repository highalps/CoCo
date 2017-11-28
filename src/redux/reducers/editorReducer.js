/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { setToken } from '../../utils/authUtils'

const initialState = {
    directory: Immutable.Map(),
    joinClassId: '',
}

//type name contents
function iterateObj(obj){
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === 'object'){
                iterateObj(obj[key])
            } else if(key === 'name'){
                obj['title'] = obj[key]
            } else if (key === 'contents') {
                obj['children'] = obj[key]
            }
        }
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_DIRECTORY_SUCCESS: {
            const { directory } = action.payload
            iterateObj(directory)
            return {
                ...state,
                directory: Immutable.fromJS(directory),
            }
        }

        case AT.JOIN_CLASS:
            const { classId } = action.payload
            return {
                ...state,
                joinClassId: classId,
            }

        case AT.EXIT_CLASS:
            return initialState

        default:
            return state
    }
}

export default userReducer
