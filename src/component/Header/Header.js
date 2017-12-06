/* */
import React from 'react'
import classNames from 'classnames'
import autobind from 'core-decorators/lib/autobind'
import webSocket from 'service/terminalSocketService'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

/* */
import styles from './Header.scss'
import { editorActions } from '../../redux/actions'

@withRouter
@connect()
class Header extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }


    @autobind
    handleCompile(){
        webSocket.requestCompile(this.props.maxDepth)
    }

    @autobind
    handleSave() {
        const payload = {
            classId: this.props.match.params.classId,
        }
        this.props.dispatch(editorActions.saveDirectory(payload))
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Link to={'/'}>
                    <div className={styles.title}>
                        CoCo
                    </div>
                </Link>
                <div className={styles.option}>
                    <div className={styles.runOption} onClick={this.handleCompile}>
                        <i className={classNames(styles.runIcon, "fa fa-play-circle-o")} />
                        <div className={styles.text}>Run</div>
                    </div>
                    <div className={styles.runOption} onClick={this.handleSave}>
                        <i className={classNames(styles.runIcon, "fa fa-save")} />
                        <div className={styles.text}>Save (테스트)</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
