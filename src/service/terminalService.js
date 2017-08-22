/* */
import Terminal from 'xterm'

class TerminalService {

    constructor() {
        this._terminalContainer = null
        this._term = null
    }

    initialize(refs, option) {
        if (!this._terminalContainer) {
            this._terminalContainer = refs
            this._term = new Terminal(option)
            this._term.open(this._terminalContainer)
            const fitAddon = Terminal.loadAddon('fit')
            fitAddon.fit(this._term)
            return this._term
        }
    }

    getTerminal() {
        return this._term
    }

    writeTerminal(data) {
        if (this._term) {
           this._term.write(data)
        }
    }
}

export default new TerminalService()