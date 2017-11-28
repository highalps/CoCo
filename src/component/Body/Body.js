/* */
import React from 'react'
import PropTypes from 'prop-types'

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
              <MainEditor classId={this.props.classId} />
            </div>
        )
    }
}

Body.propTypes = {
    classId: PropTypes.number,
}

Body.defaultProps = {
    classId: 0,
}

export default Body
