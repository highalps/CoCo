/* */
import Immutable from 'immutable'

const initialState = {
    directory: Immutable.Map(),
}

const directoryReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default directoryReducer