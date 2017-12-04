/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { insertPath } from './reducerUtils'

const initialState = {
    directory: Immutable.Map(),
}

const editorReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_DIRECTORY_SUCCESS: {
            const directory = action.payload.directory.dir
            insertPath(directory)
            return {
                ...state,
                directory: Immutable.fromJS(directory),
            }
        }

        default:
            return state;
    }
}

export default editorReducer
