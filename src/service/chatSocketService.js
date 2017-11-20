/* */
import io from 'socket.io-client'

/* */
import Redux from '../service/reduxService'
import { chatActions } from '../redux/actions'

class UpdateSocket {

    constructor() {
        this._socket = null
    }

    connect() {
        this._socket = io('external.cocotutor.ml/data/', { secure: true })
        // TODO: 프로젝트 정보 얻어오면 8001을 해당 _id로 변경
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('chat', this._onChat.bind(this))
    }

    join (chatId) {
        console.log('join', chatId)
        this._socket.emit('join', chatId)
    }

    _onConnect() {
        console.log("chat socket connected")
    }

    _onDisConnect() {}

    _onChat(data) {
        Redux.dispatch(chatActions.updateMessage(data))
        cosole.log('onChat', data)
    }


}

export default new UpdateSocket()