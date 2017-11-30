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
                    currentFileName={this.props.currentFileName}
                    handleCancelClick={this.props.handleCancelClick}
                    handleTabClick={this.props.handleTabClick} />
                <Terminal />
                <WebStreamWrapper />
            </div>
        )
    }
}

export default MainEditor
