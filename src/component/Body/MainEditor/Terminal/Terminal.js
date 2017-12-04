/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { withRouter } from 'react-router'

/* */
import styles from './Terminal.scss'
import terminalService from 'service/terminalService'
import webSocket from 'service/terminalSocketService'

const option = {
    cursorBlink: false,  // Do not blink the terminal's cursor
    cols: 120,  // Set the terminal's width to 120 columns
    rows: 80,  // Set the terminal's height to 80 rows
    cursorStyle: 'underline',
    bellStyle: 'sound',
}

@withRouter
class TerminalComponent extends React.Component {

    constructor() {
        super()
        this.term = null
        this._refs = {}
        this.state = {
            shellPrompt: 'unknown:~/workspace $ ',
            bashText: '',
        }
    }

    componentDidMount() {
        this.term = terminalService.initialize(this._refs.terminal, option)
        this.term.focus()
        this.initailize()
    }

    initailize() {
        const classNum = this.props.match.params.classId
        webSocket.connect(classNum)

        // add event listener
        this.term.on('key', this.handleKeyDown)
        this.term.on('paste', this.handlePaste)
        this.term.writeln('')
    }

    @autobind
    handlePaste(data) {
        this.term.write(data)
    }

    @autobind
    handleKeyDown(key, e) {
        const printable = !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey
        if (e.keyCode === 13) {
            webSocket.sendCommand(this.state.bashText)
            this.setState({ bashText: '' }, () => this.term.write('\r\n'))
        } else if (e.keyCode === 8) {
            // Do not delete the prompt
            if (this.state.bashText) {
                this.term.write('\b \b')
            }
            this.setState({ bashText: this.state.bashText.substring(0, this.state.bashText.length - 1) })

        } else if (printable) {
            this.setState({
                bashText: this.state.bashText + key
            }, () => this.term.write(key))
        }
    }

    render() {
        return(
            <div className={styles.wrapper}>
                <div className={styles.sizeBar}>
                    Terminal
                </div>
                <div
                    ref={e => this._refs.terminal = e}
                    className={styles.terminal}>
                </div>
            </div>
        )
    }
}

export default TerminalComponent
