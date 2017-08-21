/* */
import React from 'react'

/* */
import styles from './App.scss'
import Header from '../../component/Header'
import Body from '../../component/Body'
import Footer from '../../component/Footer'
import Websocket from '../../service/webSocketService'


class App extends React.Component {

    constructor() {
        super()
        Websocket.connect()
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
