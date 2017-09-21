/* */
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import List from './container/List'
import App from './container/App'
import SignUp from './container/SignUp'
import SignIn from './container/SignIn'


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/list" component={List} />
            <Route path="/sopad" component={App} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/signIn" component={SignIn} />
        </Switch>
    </Router>
)
