/* */
import io from 'socket.io-client'

/* */
//import terminalService from './terminalService'

class DirectorySocket {

    constructor() {
        this._socket = null
    }

    connect() {
        this._socket = io('/update')
        // TODO: 프로젝트 정보 얻어오면 8001을 해당 _id로 변경
        this._socket.emit('join room', 8001)
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('update', this._onUpdate.bind(this))
    }

    sendCommand(command) {
        this._socket.emit('command', command)
    }

    _onConnect() {}

    _onDisConnect() {}

    _onUpdate(directory) {
        console.log('디렉토리 업데이트');
        // TODO: SideBar에 업데이트
    }
}

export default new DirectorySocket()