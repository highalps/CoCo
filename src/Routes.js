/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import App from './container/App/App'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
        </Switch>
    </Router>
)




