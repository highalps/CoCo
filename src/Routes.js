/* */
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

/* */
import Home from './container/Home'
import App from './container/App'
import ClassesContainer from './container/ClassesContainer'
import RegisterTutor from './container/RegisterTutor'
import MyPageContainer from './container/MyPageContainer'
import ChatWrapper from './component/ChatWrapper'
import SignModal from './component/SignModal'
import ScreenCover from './component/ScreenCover'

export default () => (
    <HashRouter>
        <div style={{ width: "100%", height: "100%", fontFamily: 'Nanum Square' }}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/editor/:classId" component={App} />
                <Route path="/classes" component={ClassesContainer} />
                <Route path="/RegisterTutor" component={RegisterTutor} />
                <Route path="/MyPage" component={MyPageContainer} />
            </Switch>
            <ChatWrapper />
            <SignModal />
            <ScreenCover />
        </div>
    </HashRouter>
)
