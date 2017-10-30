/* */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

/* */
import Routes from './Routes'
import Redux from './service/reduxService'
import { initAuth } from './utils/authUtils'

// import global styles
import './styles/global.scss'
import './styles/xterm.scss'

// import codemirror mode & style
// import 'codemirror/mode/javascript/javascript.js'
// import 'codemirror/mode/clike/clike.js'
// import 'codemirror/theme/panda-syntax.css'
// import 'codemirror/theme/isotope.css'

//import bootstrap
// import 'bootstrap/dist/css/bootstrap.css'

initAuth()

/* Render */
ReactDOM.render(
    <Provider store={Redux.getStore()}>
        <Routes />
    </Provider>,
    window.document.getElementById('main')
)
