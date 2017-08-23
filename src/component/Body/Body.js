/* */
import React from 'react'
import { connect } from 'redux'

/* */
import styles from './Body.scss'
import SideBar from './SideBar'
import MainEditor from './MainEditor'

class Body extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
              <SideBar />
              <MainEditor />
            </div>
        )
    }
}

export default connect()(Body)
