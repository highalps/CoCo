/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './ChatMessage.scss'
import { chatActions, uiActions } from '../../redux/actions'

const mapStateToProps = (state) => ({
    messages: state.chatReducer.chatList,
    chatId: state.chatReducer.currentChatId,
})

@connect(mapStateToProps)
class ChatMessage extends React.Component {

    constructor() {
        super()
        this.state = {
            chatLoading: true,
        }
    }

    componentDidMount() {
        const payload = {
            chatId: this.props.chatId
        }
        this.props.dispatch(chatActions.getChatMessages(payload))
    }


    render() {
        return (
            <div className={styles.wrapper}>

            </div>
        )
    }
}

export default ChatMessage
