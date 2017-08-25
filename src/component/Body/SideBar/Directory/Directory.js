/* */
import React from 'react'
import axios from 'axios'

/* */
import styles from './Directory.scss'

class Directory extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div
                className={styles.wrapper}>
                디렉토리
            </div>
        )
    }
}

export default Directory
