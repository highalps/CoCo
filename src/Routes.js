/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import List from './container/List'
import App from './container/App'
import Login from './container/Login'


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/list" component={List} />
            <Route path="/sopad" component={App} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
)
