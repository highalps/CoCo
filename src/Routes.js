/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import App from './container/App/App'
import Login from './component/Login/Login'
export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
)
