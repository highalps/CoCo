/* */
import React from 'react'

/* */
import styles from './MainEditor.scss'
import TextEditor from './TextEditor'
import Terminal from './Terminal'

class MainEditor extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div
                className={styles.wrapper}>
                 <TextEditor />
                 <Terminal />
            </div>
        )
    }
}

export default MainEditor
