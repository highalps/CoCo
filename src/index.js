/* */
import React from 'react'
import ReactDOM from 'react-dom'

/* */
import Routes from './Routes'

require('./styles/global.scss')

/* Render */
ReactDOM.render(
    <Routes />,
    window.document.getElementById('main')
)