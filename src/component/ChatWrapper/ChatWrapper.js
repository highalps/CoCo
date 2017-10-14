/* */
import React from 'react'
import PropTypes from 'prop-types'

/* */
import styles from './ChatWrapper.scss'
import ChatButton from '../ChatButton'
import ChatList from '../ChatList'
import ChatMessage from '../ChatMessage'

class ChatWrapper extends React.Component {

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
                <ChatButton
                    showChatList={this.props.showChatList}
                    showChatMessage={this.props.showChatMessage} />
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
