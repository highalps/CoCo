/* */
import React from 'react'

/* */
import styles from './SideBar.scss'
import Project from './Project'

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
               <Project />
           </div>
        )
    }
}

export default SideBar
