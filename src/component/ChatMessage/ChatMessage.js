/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './ChatMessage.scss'
import { chatActions, uiActions } from '../../redux/actions'
import chatSocket from 'service/updateSocketService'

const mapStateToProps = (state) => ({
    nickname: state.userReducer.nickname,
    chat: state.chatReducer.chat,
    chatId: state.chatReducer.currentChatId,
})

@connect(mapStateToProps)
class ChatMessage extends React.Component {

    constructor() {
        super()
        this.state = {
            chatLoading: true,
            message: '',
        }
    }

    componentDidMount() {
        const payload = {
            chatId: this.props.chatId
        }
        this.props.dispatch(chatActions.getMessages(payload))
    }

    @autobind
    handleOnChange(event) {
        this.setState({ message: event.target.value })
    }

    @autobind
    handleKeyUp(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            const { chat } = this.props
            const payload = {
                chatId: this.props.chatId,
                mode: chat.get('mode'),
                nickname: this.props.nickname,
                message: this.state.message,
            }
            this.props.dispatch(chatActions.createMessage(payload))
                .then(() => this.setState({ message: '' }))
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.header} />
                <div className={styles.body}>
                    <div className={styles.messages}>

                    </div>
                </div>
                <div className={styles.footer}>
                    <textarea
                        className={styles.input}
                        value={this.state.message}
                        onKeyUp={this.handleKeyUp}
                        onChange={this.handleOnChange} />
                    <div className={styles.send}>보내기</div>
               </div>
            </div>
        )
    }
}

export default ChatMessage
