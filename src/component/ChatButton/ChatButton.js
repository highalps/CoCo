/* */
import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'core-decorators/lib/autobind'
import { connect } from 'react-redux'

/* */
import styles from './ChatButton.scss'
import { uiActions } from '../../redux/actions'

const openButton = require('../../styles/icon/chatButton.png')
const closeButton = require('../../styles/icon/chatClose.png')

@connect()
class ChatButton extends React.Component {

    @autobind
    handleButtonClick() {
        if (this.props.showChatList || this.props.showChatMessage) {
            this.props.dispatch(uiActions.closeChat())
        } else {
            this.props.dispatch(uiActions.showChatList())
        }
    }

    render() {
        return (
            <div className={styles.wrapper} onClick={this.handleButtonClick}>
                <img
                    className={styles.image}
                    src={(this.props.showChatList || this.props.showChatMessage) ? closeButton : openButton} />
            </div>
        )
    }
}

export default ChatButton