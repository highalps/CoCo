/* */
import React from 'react'
import { connect } from 'react-redux'

/* */
import styles from './App.scss'
import Header from '../../component/Header'
import Body from '../../component/Body'
import Footer from '../../component/Footer'
import { uiActions, editorActions } from '../../redux/actions/'

const mapStateToProps = (state) => ({
    directory: state.editorReducer.directory,
})

@connect(mapStateToProps)
class App extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        this.props.dispatch(uiActions.closeChat())
        const payload = {
            chatId: this.props.chatId || this.props.location.pathname.split('editor/')[1],
        }
        this.props.dispatch(editorActions.getDirectory(payload))
            .then(() => this.setState({ isLoading: false }))
    }

    renderEditor() {
        if (this.state.isLoading) {
            return (
                <div className={styles.wrapper}>
                    <div className={styles.loading}>
                        <div className={styles.header}>
                        </div>
                        <div className={styles.body}>

                        </div>
                    </div>
                </div>
            )
        }
       return (
           <div className={styles.wrapper}>
               <Header />
               <Body directory={this.props.directory} />
               <Footer />
           </div>
       )
    }

    render() {
        return this.renderEditor()
    }
}

export default App
