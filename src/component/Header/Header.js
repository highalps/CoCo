/* */
import React from 'react'
import classNames from 'classnames'
import autobind from 'core-decorators/lib/autobind'
import webSocket from 'service/terminalSocketService'

/* */
import styles from './Header.scss'

class Header extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }


    @autobind
    compile(){
        webSocket.requestCompile()
    }


    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (wasOutside && visible) this.setState({ visible: false, });
    };


    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    CoCo
                </div>
                <div className={styles.option}>
                    <div className={styles.runOption} onClick={this.compile}>
                        <i className={classNames(styles.runIcon, "fa fa-play-circle-o")} />
                        <div className={styles.text}>Run</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
