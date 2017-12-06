/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { insertPath, getMaxDepth } from './reducerUtils'

const initialState = {
    directory: Immutable.Map(),
    maxDepth: 0,
}

const editorReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.GET_DIRECTORY_SUCCESS: {
            const directory = action.payload.directory.dir
            insertPath(directory)
            return {
                ...state,
                directory: Immutable.fromJS(directory),
                maxDepth: getMaxDepth(directory),
            }
        }

        default:
            return state;
    }
}

export default editorReducer
