/* */
import io from 'socket.io-client'

/* */
import terminalService from './terminalService'
import Redux from './reduxService'

class TerminalSocketService {

    constructor() {
        this._socket = null
    }

    connect(classNum) {
        this._socket = io('https://external.cocotutor.ml/' + classNum)
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('data', this._onData.bind(this))

        /**
         * temporarily using terminal socket as directory CRUD
         **/
        this._socket.on('directory', this._onDirectory.bind(this))
    }

    sendCommand(command) {
        this._socket.emit('command', command)
    }

    requestCompile(maxDepth) {
        this._socket.emit('run', maxDepth)
    }

    _onConnect() {}

    _onDisConnect() {}

    _onData(data) {
        terminalService.writeTerminal(data)
    }

    _onDirectory(file) {
        console.log('directory socket', data)
        // Redux.dispatch()
    }
}

export default new TerminalSocketService()