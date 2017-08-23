/* */
import React from 'react'

/* */
import styles from './MainScreen.scss'

class MainScreen extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
              <div></div>
            </div>
        )
    }
}

export default MainScreen
