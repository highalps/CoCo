/* */
import React from 'react'
import { connect } from 'react-redux'

/* */
import styles from './App.scss'
import Header from 'component/Header'
import Body from 'component/Body'
import Footer from 'component/Footer'
import TerminalSocket from 'service/terminalSocketService'
import DirectorySocket from 'service/directorySocketService'

const mapStateToProps = (state) => ({
    //TODO: 로그인 성공시 디렉토리 정보와 프로젝트 정보 가져오기
})

@connect(mapStateToProps)
class App extends React.Component {

    constructor() {
        super()
        TerminalSocket.connect()
        DirectorySocket.connect()
    }

    render() {
        return (
            <div className={styles.wrapper}>
               <Header />
               <Body />
               <Footer />
            </div>
        )
    }
}

export default App
