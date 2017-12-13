/* */
import Immutable from 'immutable'

/* */
import AT from '../actions/actionTypes'
import { insertPath, getMaxDepth, createFile, deleteFile, renameFile } from './reducerUtils'

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

        case AT.ON_CREATE_FILE:
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

        case AT.ON_RENAME_FILE:
        case AT.RENAME_FILE_SUCCESS: {
            const { type, prevName, nextName, key, newKey } = action.payload
            const directory = state.directory.toJS()
            renameFile(directory, { type, prevName, nextName, prevKey: key, newKey })
            return {
                ...state,
                directory: Immutable.fromJS(directory),
            }
        }

        case AT.ON_REMOVE_FILE:
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
