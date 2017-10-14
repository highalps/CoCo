/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* */
import styles from './Home.scss'
import NavBar from '../../component/NavBar'
import ChatWrapper from '../../component/ChatWrapper'

const mapStateToProps = (state) => ({
    isLogged: state.userReducer.isLogged,
    showChatList: state.uiReducer.uiState.get('chatList'),
    showChatMessage: state.uiReducer.uiState.get('chatMessage'),
})

@connect(mapStateToProps)
class Home extends React.Component {

    renderChatButton() {
        if (this.props.isLogged) {
            return (
                <div className={styles.chatWrapper}>
                    <ChatWrapper
                        showChatList={this.props.showChatList}
                        showChatMessage={this.props.showChatMessage} />
                </div>
            )
        }
        return null
    }

    render() {
        return (
            <div className={styles.wrapper}>
               <NavBar isLogged={this.props.isLogged} />
                <div className={styles.main} />
                {this.renderChatButton()}
            </div>
        )
    }
}

Home.propTypes = {
    isLogged: PropTypes.bool,
    showChatButton: PropTypes.bool,
    showChatList: PropTypes.bool,
    showChatMessage: PropTypes.bool,
}

Home.defaultProps = {
    isLogged: false,
    showChatButton: false,
    showChatList: false,
    showChatMessage: false,
}

export default Home
