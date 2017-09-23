/* */
import React from 'react'
import classNames from 'classnames'

/* */
import styles from './Header.scss'

class Header extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    CoCo
                </div>
                <div className={styles.option}>
                    <div className={styles.runOption}>
                        <i className={classNames(styles.runIcon, "fa fa-play-circle-o")} />
                        <div className={styles.text}>Run</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
