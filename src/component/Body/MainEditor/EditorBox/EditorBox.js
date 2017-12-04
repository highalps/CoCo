/* */
import React from 'react'
import classNames from 'classnames'
import Immutable from 'immutable'

/* */
import styles from './EditorBox.scss'
import TextEditor from '../TextEditor'

class EditorBox extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tabList.size !== this.props.tabList.size) {
        }
    }


    handleTabClick(tab) {
        console.log('A', tab)
        this.props.handleTabClick(tab.fileName)
    }

    renderTab() {
        return (
            <div ref={e => this._refs.tab = e} className={styles.tab}>
                {this.props.tabList.map(tab => (
                    <div key={tab.fileName} ref={e => this._refs[tab.fileName] = e} className={styles.item}>
                        <div
                            className={classNames({ [styles.selected]: tab.fileName === this.props.currentFileName }, styles.file)}
                            onClick={() => this.handleTabClick(tab)}>
                            {tab.fileName.split('/').pop()}
                        </div>
                        <span className={styles.cancel} onClick={() => this.props.handleCancelClick(tab)}>x</span>
                    </div>
                ))}
            </div>
        )
    }
    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderTab()}
                <TextEditor
                    isTabEmpty={!this.props.tabList.size}
                    currentFileName={this.props.currentFileName}
                    classNum={this.props.classNum} />
            </div>
        )
    }
}

export default EditorBox
