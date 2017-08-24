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
                <img className ={styles.coddingImg} src="https://oxfest.files.wordpress.com/2017/02/codingsnippet.jpg"/>
            </div>
        )
    }
}

export default MainScreen
