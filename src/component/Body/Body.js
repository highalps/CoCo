/* */
import React from 'react'

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
              <SideBar directory={this.props.directory} />
              <MainEditor />
            </div>
        )
    }
}

export default Body
