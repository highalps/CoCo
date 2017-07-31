/* */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

/* */
import App from './container/App/App'

export default () => {
    return (
        <Router>
            <div>
                <Route path="/" component={App} />
            </div>
        </Router>
    )
}




