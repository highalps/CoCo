/* */
import React from 'react'
import propTypes from 'prop-types'

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
               <Directory
                   handleDoubleClick={this.props.handleDoubleClick}
                   directory={this.props.directory} />
           </div>
        )
    }
}

SideBar.propTypes = {
    handleDoubleClick: propTypes.func,
}

SideBar.defaultProps = {
    handleDoubleClick: () => {},
}

export default SideBar
