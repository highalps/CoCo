/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'

/* */
import styles from './ChatMessage.scss'
import { chatActions, uiActions } from '../../redux/actions'

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
    sendMessage() {
        if (this.state.message.trim()) {
            const {chat} = this.props
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

    @autobind
    handleOnChange(event) {
        this.setState({ message: event.target.value })
    }

    @autobind
    handleKeyUp(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
           this.sendMessage()
        }
    }

    isSamePerson(nickname) {
        return this.props.nickname === nickname
    }

    renderMessages() {
        const chats = this.props.chat.get('messages')
        return chats.map(chat => {
            const isDifferntPerson = !this.isSamePerson(chat.get('nickname'))
            const isAdmin = chat.get('nickname') === 'admin'
            return (
                    <div className={classNames(styles.item, { [styles.fromMe]: !isDifferntPerson, [styles.admin]: isAdmin })}>
                        {
                            isDifferntPerson && !isAdmin
                               ? (<div className={styles.avatar}>{chat.get('nickname')[0]}</div>)
                               : null
                        }
                        <div className={classNames(styles.message, {[styles.fromMe]: !isDifferntPerson, [styles.admin]: isAdmin })}>
                            {chat.get('message')}
                        </div>
                    </div>
            )
        })
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    chat with
                </div>
                <div className={styles.body}>
                    <div className={styles.messageWrapper}>
                        {this.renderMessages()}
                    </div>
                </div>
                <div className={styles.footer}>
                    <textarea
                        className={styles.input}
                        value={this.state.message}
                        onKeyUp={this.handleKeyUp}
                        onChange={this.handleOnChange} />
                    <div className={classNames(styles.send, { [styles.isFilled]: this.state.message })}
                         onClick={this.sendMessage}>
                        보내기
                    </div>
               </div>
            </div>
        )
    }
}

export default ChatMessage
