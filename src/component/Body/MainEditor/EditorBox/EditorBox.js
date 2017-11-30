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

    componentDidMount() {

    }


    renderTab() {
        return (
            <div className={styles.tab}>
                {this.props.tabList.map(tab => (
                    <div key={`${tab.index}${tab.title}`} className={styles.item}>
                        <div
                            className={classNames({ [styles.selected]: tab.title === this.props.currentFileName }, styles.file)}
                            onClick={() => this.props.handleTabClick(tab.title)}>
                            {tab.title}
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
                <TextEditor currentFileName={this.props.currentFileName} classNum={this.props.classNum}/>
            </div>
        )
    }
}

export default EditorBox
