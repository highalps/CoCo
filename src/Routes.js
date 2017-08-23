/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
)
