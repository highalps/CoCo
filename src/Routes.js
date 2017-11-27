/* */
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import App from './container/App'
import SignUp from './container/SignUp'
import SignIn from './container/SignIn'
import ClassesContainer from './container/ClassesContainer'
import RegisterTutor from './container/RegisterTutor'
import MyPageContainer from './container/MyPageContainer'
import ChatWrapper from './component/ChatWrapper'

export default () => (
    <HashRouter>
        <div style={{ width: "100%", height: "100%" }}>
            <ChatWrapper />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/editor/:number" component={App} />
                <Route path="/classes" component={ClassesContainer} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/signIn" component={SignIn} />
                <Route path="/RegisterTutor" component={RegisterTutor} />
                <Route path="/MyPage" component={MyPageContainer} />
            </Switch>
        </div>
    </HashRouter>
)
