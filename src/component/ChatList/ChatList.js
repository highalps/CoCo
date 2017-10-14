/* */
import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'core-decorators/lib/autobind'
import { connect } from 'react-redux'

/* */
import styles from './ChatList.scss'
import { uiActions } from '../../redux/actions'

@connect()
class ChatList extends React.Component {

    @autobind
    handleButtonClick() {
        this.props.dispatch(uiActions.showChatButton())
    }

    renderChatList() {
        return (
            <div className={styles.chatList}>
                <div className={styles.item}>

                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.button} onClick={this.handleButtonClick}>
                        X
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatList
