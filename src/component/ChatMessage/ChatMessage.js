/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'
import { withRouter } from 'react-router'

/* */
import styles from './ChatMessage.scss'
import { chatActions, uiActions } from '../../redux/actions'
import client from '../../redux/base.js'

const mapStateToProps = (state) => ({
    classNum:state.chatReducer.classNum,
    isWriter: state.chatReducer.isWriter,
    nickname: state.userReducer.nickname,
    status:state.chatReducer.status,
    chat: state.chatReducer.chat,
    chatId: state.chatReducer.currentChatId,
})
@withRouter
@connect(mapStateToProps)
class ChatMessage extends React.Component {

    constructor() {
        super()
        this._refs = {}
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
            .then(() => {
                this.setState({ chatLoading: false })
                this.scrollDown()
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chat.size) {
            const prevChat = prevProps.chat.get('messages')
            const curChat =  this.props.chat.get('messages')
            if (prevChat.size !== curChat.size) {
                this.scrollDown()
            }
        }
    }

    scrollDown() {
        if (this._refs.body) {
            const e = this._refs.body
            e.scrollTop = e.scrollHeight
        }
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
                .then(() => {
                    this.setState({ message: '' })
                    this.scrollDown()
                })
        }
    }

    @autobind
    handleOnChange(event) {
        this.setState({ message: event.target.value })
    }
    @autobind
    handleClickParticipate() {
        this.props.history.push(`/editor/${this.props.classNum}`)
    }
    @autobind
    accept(){
        console.log('accept')
        return () => {
            client.put('api/chat/request/'+this.props.chatId)
                .then(res =>{
                    console.log(res)
                    this.props.dispatch(chatActions.setStatus(3))
                })
                .catch(error =>{console.log(error)
                })
        }
    }
    @autobind
    ifMatchingCompleted() {
        console.log("ismatched", this.props.status)
        if(this.props.status === 3) {
            return (
                <div className={styles.chatTitle} onClick={this.handleClickParticipate}>참여하기</div>
            )
        }
        else if(this.props.isWriter === true){
            return (
                <div className={styles.chatTitle} onClick={this.accept()}>수락</div>
            )
        }
    }

    @autobind
    handleKeyUp(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
           this.sendMessage()
        }
    }

    @autobind
    handleClickButton() {
        this.props.dispatch(uiActions.showChatList())
    }

    isSamePerson(nickname) {
        return this.props.nickname === nickname
    }

    renderMessages() {
        const { chat } = this.props
        const chats =  chat.get('messages')
        if (this.state.chatLoading) {
            return (
                <div className={styles.spinner}>
                    <div className={styles.bounce1}></div>
                    <div className={styles.bounce2}></div>
                </div>
            )
        }
        return chats.map((chat,idx) => {
            const isDifferntPerson = !this.isSamePerson(chat.get('nickname'))
            const isAdmin = chat.get('nickname') === 'admin'
            return (
                    <div key={idx} className={classNames(styles.item, { [styles.fromMe]: !isDifferntPerson, [styles.admin]: isAdmin })}>
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
                    <div className={classNames("fa fa-arrow-left", styles.button)} onClick={this.handleClickButton} />
                    <div className={styles.chatTitle}>chat with {this.props.chat.get('person')}</div>
                    {this.ifMatchingCompleted()}
                </div>
                <div ref={e => this._refs.body = e} className={styles.body}>
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
