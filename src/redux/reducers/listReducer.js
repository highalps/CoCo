/* */
import Immutable from 'immutable'

/* */
import AT from '../../redux/actions/actionTypes'

const initialState = {
    project: Immutable.Map(),
}

const listReducer = (state = initialState, action) => {
    switch(action.type) {
        case AT.GET_LIST_SUCCESS:
            return {
                project: Immutable.fromJS({
                    id: '111',
                    name: 'test project',
                })
            }
        default:
            return state;
    }
}

export default listReducer
