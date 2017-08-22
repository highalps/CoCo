/* */
import io from 'socket.io-client'

/* */
import terminalService from './terminalService'

class WebSocketService {

    constructor() {
        this._socket = null
    }

    connect() {
        this._socket = io("ws://" + window.location.hostname + ":3000")
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('data', this._onData.bind(this))
    }

    getWebsocket() {
        return this._socket
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

export default new WebSocketService()