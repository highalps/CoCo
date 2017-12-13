/* */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

/* */
import Routes from './Routes'
import Redux from './service/reduxService'
import { initAuth } from './utils/authUtils'
import ReduxToastr from 'react-redux-toastr'

// import global styles
import './styles/global.scss'
import './styles/xterm.scss'
import './styles/fonts/NanumSquare/font.css'

// import codemirror mode & style
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/theme/isotope.css'

//import bootstrap
import 'bootstrap/dist/css/bootstrap.css'

initAuth()

/* Render */
ReactDOM.render(
    <Provider store={Redux.getStore()}>
        <div style={{width: '100%', height: '100%' }}>
            <Routes />
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-center"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar />
        </div>
    </Provider>,
    window.document.getElementById('main')
)
