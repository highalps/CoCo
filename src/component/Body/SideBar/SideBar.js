/* */
import React from 'react'

/* */
import styles from './SideBar.scss'
import Directory from './Directory'

class SideBar extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
           <div className={styles.wrapper}>
               <div className={styles.tab}>
                    탭
               </div>
               <Directory directory={this.props.directory} />
           </div>
        )
    }
}

export default SideBar
