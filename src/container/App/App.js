/* */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

/* */
import styles from './App.scss'
import Header from '../../component/Header'
import Body from '../../component/Body'
import Footer from '../../component/Modal'
import { uiActions, editorActions } from '../../redux/actions/'

const mapStateToProps = (state) => ({
    directory: state.editorReducer.directory,
})

@withRouter
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
            classId: this.props.match.params.classId,
        }
        this.props.dispatch(editorActions.getDirectory(payload))
            .then(() => setTimeout(() => this.setState({ isLoading: false }), 3000))
    }

    renderEditor() {
        if (this.state.isLoading) {
            return (
                <div className={styles.wrapper}>
                    <div className={styles.loading}>
                        <div className={styles.body}>
                            <img className={styles.image} src={require('../../styles/icon/editor_loading.gif')} />
                        </div>
                        <div className={styles.description}>
                            도커 컨테이너 가동 및 디렉토리 정보를 받아오는 중입니다...
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
