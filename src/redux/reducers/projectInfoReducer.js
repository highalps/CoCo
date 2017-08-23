/* */
import Immutable from 'immutable'

const initialState = {
    project: Immutable.Map(),
}

const projectInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default projectInfoReducer