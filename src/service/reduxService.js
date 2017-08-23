/* */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger' // for debuggin action

/* */
import reducers from '../redux/reducers/index'

class ReduxService {

    constructor() {
        this.store = createStore(
            combineReducers(reducers),
            applyMiddleware(
                logger,
                thunk
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