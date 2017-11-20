/* */
import io from 'socket.io-client'

/* */
import terminalService from './terminalService'

class TerminalSocketService {

    constructor() {
        this._socket = null
    }

    connect() {
        // TODO: 8001을 project 정보의 _id로 변경
        this._socket = io('https://external.cocotutor.ml/' + '8001')
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('data', this._onData.bind(this))
    }

    sendCommand(command) {
        this._socket.emit('command', command)
    }

    _onConnect() {}

    _onDisConnect() {}

    _onData(data) {
        terminalService.writeTerminal(data)
    }
}

export default new TerminalSocketService()