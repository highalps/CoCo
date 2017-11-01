/* */
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import App from './container/App'
import SignUp from './container/SignUp'
import SignIn from './container/SignIn'
import Classes from './container/Classes'
import RegisterTutor from './container/RegisterTutor'
import MyPage from './container/MyPage'
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
                <Route path="/RegisterTutor" component={RegisterTutor} />
                <Route path="/MyPage" component={MyPage} />
            </Switch>
        </div>
    </HashRouter>
)
