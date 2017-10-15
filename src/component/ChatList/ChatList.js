/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* */
import styles from './ChatList.scss'

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


@connect()
class ChatList extends React.Component {


    renderChatList() {
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
