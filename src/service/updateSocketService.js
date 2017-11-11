/* */
import io from 'socket.io-client'

class UpdateSocket {

    constructor() {
        this._socket = null
    }

    connect() {
        this._socket = io('https://external.cocotutor.ml/update')
        // TODO: 프로젝트 정보 얻어오면 8001을 해당 _id로 변경
        this._socket.emit('join room', 8001)
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('directory', this._onDirectoryUpdate.bind(this))
        this._socket.on('user', this._onUserUpdate.bind(this))
    }

    sendCommand(command) {
        this._socket.emit('command', command)
    }

    _onConnect() {}

    _onDisConnect() {}

    _onDirectoryUpdate(data) {
        // TODO: SideBar에 업데이트
    }

    _onUserUpdate(data) {
    }
}

export default new UpdateSocket()