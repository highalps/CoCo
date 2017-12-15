/* */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger' // for debuggin action

/* */
import reducers from '../redux/reducers/index'
import { reducer as toastrReducer } from 'react-redux-toastr'

class ReduxService {

    constructor() {
        const reducer = {
            ...reducers,
            toastr: toastrReducer,
        }
        this.store = createStore(
            combineReducers(reducer),
            applyMiddleware(
                thunk,
                logger
            )
        )
    }

    getStore() {
        return this.store
    }

    dispatch(action) {
        this.store.dispatch(action)
    }
}

export default new ReduxService()