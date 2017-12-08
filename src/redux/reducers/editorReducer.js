/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { insertPath, getMaxDepth, createFile, deleteFile } from './reducerUtils'

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
                directory: Immutable.fromJS(directory),
                maxDepth: getMaxDepth(...directory),
            }
        }

        case AT.CREATE_FILE_SUCCESS: {
            const { type, fileName, path } = action.payload
            const directory = state.directory.toJS()
            createFile(directory, { type, title: fileName, path })
            return {
                ...state,
                directory: Immutable.fromJS(directory),
                maxDepth: getMaxDepth(...directory)
            }
        }

        case AT.REMOVE_FILE_SUCCESS: {
            const { type, fileName, key } = action.payload
            const directory = state.directory.toJS()
            deleteFile(directory, { type, title: fileName, key })
            return {
                ...state,
                directory: Immutable.fromJS(directory),
                maxDepth: getMaxDepth(...directory)
            }
        }

        default:
            return state;
    }
}

export default editorReducer
