/* */
import React from 'react'
import { connect } from 'react-redux'

/* */
import styles from './MainEditor.scss'
import EditorBox from './EditorBox'
import Terminal from './Terminal'
import WebStreamWrapper from './WebStreamWrapper'

@connect()
class MainEditor extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <EditorBox
                    tabList={this.props.tabList}
                    handleCancelClick={this.props.handleCancelClick} />
                <Terminal />
                <WebStreamWrapper />
            </div>
        )
    }
}

export default MainEditor
