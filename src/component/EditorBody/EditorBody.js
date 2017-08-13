/* */
import React from 'react'

/* */
import styles from './EditorBody.scss'
import SideBar from './SideBar'
import TextEditor from './MainEditor'

class EditorBody extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
              <SideBar />
              <TextEditor />
            </div>
        )
    }
}

export default EditorBody
