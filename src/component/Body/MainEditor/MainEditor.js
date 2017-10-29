/* */
import React from 'react'

/* */
import styles from './MainEditor.scss'
import EditorBox from './EditorBox'
import Terminal from './Terminal'
import WebStreamWrapper from './WebStreamWrapper'


class MainEditor extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <EditorBox />
                <WebStreamWrapper />
                <Terminal />
            </div>
        )
    }
}

export default MainEditor
