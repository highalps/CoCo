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
               <Directory
                   directory={this.props.directory}
                   currentFileName={this.props.currentFileName}
                   handleDelete={this.props.handleDelete}
                   handleRename={this.props.handleRename}
                   handleDoubleClick={this.props.handleDoubleClick} />
           </div>
        )
    }
}

SideBar.propTypes = {
    handleDelete: propTypes.func,
    handleRename: propTypes.func,
    handleDoubleClick: propTypes.func,
}

SideBar.defaultProps = {
    handleDelete: () => {},
    handleRename: () => {},
    handleDoubleClick: () => {},
}

export default SideBar
