/* */
import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'core-decorators/lib/autobind'
import { connect } from 'react-redux'

/* */
import styles from './ChatButton.scss'
import { uiActions } from '../../redux/actions'

@connect()
class ChatButton extends React.Component {

    @autobind
    handleButtonClick() {
        this.props.dispatch(uiActions.showChatList())
    }

    render() {
        return (
            <div className={styles.wrapper} onClick={this.handleButtonClick}>
                <img className={styles.button} src={require('../../styles/icon/chatButton.png')} />
            </div>
        )
    }
}

export default ChatButton