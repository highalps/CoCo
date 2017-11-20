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
        this._socket = io('https://external.cocotutor.ml/data', { secure: true })
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('chat', this._onChat.bind(this))
    }

    join (chatId) {
        console.log('join', chatId, this._socket)
        this._socket.emit('join', chatId)
    }

    _onConnect() {
        console.log("chat socket connected")
    }

    _onDisConnect() {}

    _onChat(message) {
        const payload = {
            message,
        }
        Redux.dispatch(chatActions.updateMessage(payload))
        console.log('onChat', message)
    }


}

export default new UpdateSocket()