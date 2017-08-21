/* */
import io from 'socket.io-client'

/* */

class WebSocketService {

    constructor() {
        this._socket = null
    }

    connect() {
        this._socket = io("ws://localhost:3000")
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('data', this._onData.bind(this))
    }

    getWebsocket() {
        return this._socket
    }

    sendCommand(command) {
        console.log("hgahga")
        this._socket.emit('data', command)
    }

    _onConnect(a) {
        console.log("A", a)
    }

    _onDisConnect(a) {
        console.log("B", a)
    }

    _onData(a) {
        console.log("C", a)
    }
}

export default new WebSocketService()