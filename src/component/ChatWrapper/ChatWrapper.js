/* */
import React from 'react'
import PropTypes from 'prop-types'

/* */
import styles from './ChatWrapper.scss'

class ChatWrapper extends React.Component {

    renderChat() {
        if (this.props.showChatButton) {
            return <ChatButton />
        } else if (this.props.showChatList) {
            return <ChatList />
        } else if (this.props.showChatMessage) {
            return <ChatMessage />
        }
        return null
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderChat()}
            </div>
        )
    }
}

ChatWrapper.propTypes = {
    showChatButton: PropTypes.bool,
    showChatList: PropTypes.bool,
    showChatMessage: PropTypes,bool,
}

ChatWrapper.defaultProps = {
    showChatButton: false,
    showChatList: false,
    showChatMessage: false,
}


export default ChatWrapper
