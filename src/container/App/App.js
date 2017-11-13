/* */
import React from 'react'
import { connect } from 'react-redux'

/* */
import styles from './App.scss'
import Header from 'component/Header'
import Body from 'component/Body'
import Footer from 'component/Footer'
import { uiActions } from '../../redux/actions/'
import TerminalSocket from 'service/terminalSocketService'
import UpdateSocket from 'service/updateSocketService'

const mapStateToProps = (state) => ({
})

@connect(mapStateToProps)
class App extends React.Component {

    constructor() {
        super()
        TerminalSocket.connect()
        UpdateSocket.connect()
    }

    componentDidMount() {
        this.props.dispatch(uiActions.closeChat())
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
