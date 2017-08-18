/* */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux';

/* */
import Routes from './Routes'

require('./styles/global.scss')
require('./styles/xterm.scss')

// TODO: apply redux flow && create action and reducer
//const store = createStore(counterReducer);

/* Render */
ReactDOM.render(
   // <Provider store={store}>
        <Routes />,
    //</Provider>,
    window.document.getElementById('main')
)