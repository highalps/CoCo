/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import List from './container/List'
import App from './container/App'


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/" component={List} />
            <Route exact path="/sopad" component={App} />
        </Switch>
    </Router>
)
