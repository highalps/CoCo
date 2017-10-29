/* */
import React from 'react'
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import App from './container/App'
import SignUp from './container/SignUp'
import SignIn from './container/SignIn'
import Classes from './container/Classes'
import ChatWrapper from './component/ChatWrapper'

export default () => (
    <HashRouter>
        <div style={{ width: "100%", height: "100%" }}>
            <ChatWrapper />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/editor" component={App} />
                <Route path="/classes" component={Classes} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/signIn" component={SignIn} />
            </Switch>
        </div>
    </HashRouter>
)
