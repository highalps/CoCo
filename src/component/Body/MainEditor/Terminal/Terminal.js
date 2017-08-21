/* */
import React from 'react'
import Terminal from 'xterm'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './Terminal.scss'
import webSocket from '../../../../service/webSocketService'

const option = {
    cursorBlink: true,  // Do not blink the terminal's cursor
    cols: 120,  // Set the terminal's width to 120 columns
    rows: 80  // Set the terminal's height to 80 rows
}

class TerminalComponent extends React.Component {

    constructor() {
        super()
        this.term = null
        this._refs = {}
        this.state = {
            shellScript: 'unknown:~/workspace',
            bashText: '',
        }
    }

    componentDidMount() {
        this.term = new Terminal(option)
        const fitAddon = Terminal.loadAddon('fit')
        this.term.open(this._refs.terminal)
        fitAddon.fit(this.term)
        this.term.focus()
        this.initailize()
    }

    initailize() {
        const shellprompt = 'highalps:~/workspace $ '
        this.term.write('soPad terminal')

        // add event listener
        // this.term.on('key', this.handleKeyDown)
        this.term.textarea.onkeydown = this.handleKeyDown
        this.term.on('paste', this.handlePaste)
        this.term.writeln('')

        this.term.prompt = () => {
            this.term.write('\r\n' + shellprompt)
        }
        this.term.prompt()

    }

    @autobind
    handlePaste(data) {
        this.term.write(data)
    }

    @autobind
    handleKeyDown(e) {
        console.log('a')
        webSocket.sendCommand('ls')
        this.term.write(e.target.value)
    }

    // @autobind
    // handleKeyDown(key, e) {
    //     const printable = !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey
    //
    //     if (e.keyCode === 13) {
    //         this.term.prompt()
    //     } else if (e.keyCode === 8) {
    //         // Do not delete the prompt
    //         if (this.term.x > 2) {
    //             this.term.write('\b \b')
    //         }
    //     } else if (printable) {
    //         this.term.write(key)
    //     }
    // }

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
