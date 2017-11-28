/* */
import React from 'react'
import PropTypes from 'prop-types'

/* */
import styles from './MainEditor.scss'
import EditorBox from './EditorBox'
import Terminal from './Terminal'
import WebStreamWrapper from './WebStreamWrapper'

class MainEditor extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <EditorBox classId={this.props.classId} />
                <Terminal classId={this.props.classId} />
                <WebStreamWrapper classId={this.props.classId} />
            </div>
        )
    }
}

MainEditor.propTypes = {
    classId: PropTypes.number,
}

MainEditor.defaultProps = {
    classId: 0,
}

export default MainEditor
