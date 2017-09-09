/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import App from './container/App'


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sopad" component={App} />
        </Switch>
    </Router>
)
