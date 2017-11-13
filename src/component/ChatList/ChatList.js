/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* */
import styles from './ChatList.scss'
import { chatActions } from '../../redux/actions'

const dummy = [
    {
        message: {
            lastUpdate: '2017.10.14',
            content: '수업을 희망합니다',
        }
    },
    {
        message: {
            lastUpdate: '2017.10.15',
            content: '수업 관련 질문이 있습니다',
        }
    }
]

const mapStateToProps = (state) => ({

})

@connect(mapStateToProps)
class ChatList extends React.Component {

    constructor() {
        super()
        this.state = {
            chatLoading: true,
        }
    }

    componentDidMount() {
        this.props.dispatch(chatActions.getChatList())
            .then(() => this.setState({ chatLoading: false }))
    }

    renderChatList() {
        if (this.state.chatLoading) {
            return (
                <div>불러오는 중...</div>
            )
        }
        return (
            <div className={styles.chatList}>
                {dummy.map(d => (
                <div key={d.message.content} className={styles.item}>
                    {d.message.content}
                </div>
            ))}
            </div>
        )
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderChatList()}
            </div>
        )
    }
}

export default ChatList
