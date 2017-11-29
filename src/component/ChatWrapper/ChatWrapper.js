/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

/* */
import styles from './ChatWrapper.scss'
import ChatButton from '../ChatButton'
import ChatList from '../ChatList'
import ChatMessage from '../ChatMessage'
import ChatSocket from '../../service/chatSocketService'

const mapStateToProps = (state) => ({
    isLogged: state.userReducer.isLogged,
    showChatList: state.uiReducer.uiState.get('chatList'),
    showChatMessage: state.uiReducer.uiState.get('chatMessage'),
})

@withRouter
@connect(mapStateToProps)
class ChatWrapper extends React.Component {

    constructor() {
        super()
        ChatSocket.connect()
    }

    renderChatButton() {
        if (this.props.isLogged && !this.props.location.pathname.includes('/editor')) {
            return (
                <ChatButton
                    showChatList={this.props.showChatList}
                    showChatMessage={this.props.showChatMessage}/>
            )
        }
        return null
    }

    renderChat() {
        if (this.props.showChatList) {
            return <ChatList />
        } else if (this.props.showChatMessage) {
            return <ChatMessage />
        }
        return null
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderChatButton()}
                {this.renderChat()}
            </div>
        )
    }
}

ChatWrapper.propTypes = {
    showChatList: PropTypes.bool,
    showChatMessage: PropTypes.bool,
}

ChatWrapper.defaultProps = {
    showChatList: false,
    showChatMessage: false,
}

export default ChatWrapper
