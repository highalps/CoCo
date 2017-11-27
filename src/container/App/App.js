/* */
import React from 'react'
import { connect } from 'react-redux'
import client from '../../redux/base.js'
/* */
import styles from './App.scss'
import Header from 'component/Header'
import Body from 'component/Body'
import Footer from 'component/Footer'
import { uiActions } from '../../redux/actions/'
import TerminalSocket from '../../service/terminalSocketService'



const mapStateToProps = (state) => ({
    classNum : state.classReducer.classNum
})

@connect(mapStateToProps)
class App extends React.Component {

    constructor() {
        super()
    }
    componentWillMount(){
        client.get('api/pad/compile/'+this.props.classNum).
        then(res =>{
            console.log(res)
            TerminalSocket.connect(this.props.classNum)
        }).then(error => {

        })
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
