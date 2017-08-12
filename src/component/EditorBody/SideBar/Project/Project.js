/* */
import React from 'react'

/* */
import styles from './Project.scss'

class Project extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div
                className={styles.wrapper}>
                프로젝트
            </div>
        )
    }
}

export default Project
