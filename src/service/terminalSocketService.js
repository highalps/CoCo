/* */
import io from 'socket.io-client'

/* */
import terminalService from './terminalService'

class TerminalSocketService {

    constructor() {
        this._socket = null
    }

    connect(classNum) {
        this._socket = io('https://external.cocotutor.ml/' + classNum)
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('data', this._onData.bind(this))
    }

    sendCommand(command) {
        this._socket.emit('command', command)
    }
    requestCompile() {
        console.log('requestCompile')
        this._socket.emit('run')
    }

    _onConnect() {}

    _onDisConnect() {}

    _onData(data) {
        terminalService.writeTerminal(data)
    }
}

export default new TerminalSocketService()