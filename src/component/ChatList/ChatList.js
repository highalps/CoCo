/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'

/* */
import styles from './ChatList.scss'
import { chatActions, uiActions } from '../../redux/actions'

const mapStateToProps = (state) => ({
    chatList: state.chatReducer.chatList
})

@connect(mapStateToProps)
class ChatList extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedChatNumber: -1,
            chatLoading: true,
        }
    }

    componentDidMount() {
        this.props.dispatch(chatActions.getChatList())
            .then(() => this.setState({ chatLoading: false }))
    }

    @autobind
    handleChatClick(chatId) {
        return () => {
            const payload = {
                chatId
            }
            this.props.dispatch(uiActions.showChatMessage(payload))
        }
    }

    @autobind
    handleMouseEnter(chatId) {
        event.preventDefault()
        return () => {
            this.setState({ selectedChatNumber: chatId })
        }
    }

    renderChatList() {
        if (this.state.chatLoading) {
            return (
                <div>불러오는 중...</div>
            )
        }
        return (
            <div className={styles.chatList}>
                {
                    this.props.chatList.map((chat,idx) => (
                        <div key={idx}
                             className={classNames(styles.item, {[styles.selected]: this.state.selectedChatNumber === idx})}
                             onClick={this.handleChatClick(chat.get('num'))}
                             onMouseEnter={this.handleMouseEnter(idx)}>
                                <div className={styles.icon}>
                                    {chat.get('nickname')[0]}
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>
                                        <div>{chat.get('nickname')}와의 대화</div>
                                    </div>
                                    <div className={styles.body}>
                                    </div>
                                </div>
                            </div>
                      ))
                }
            </div>
        )
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.header} />
                {this.renderChatList()}
            </div>
        )
    }
}

ChatList.propTypes = {
    // chatList: Immutable.List,
}

ChatList.defaultProps = {
    // chatList: Immutable.List(),
}

export default ChatList
