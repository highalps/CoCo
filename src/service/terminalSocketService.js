/* */
import io from 'socket.io-client'

/* */
import terminalService from './terminalService'
import Redux from './reduxService'
import { editorActions } from '../redux/actions'

class TerminalSocketService {

    constructor() {
        this._socket = null
        this.classNum = ''
    }

    connect(classNum) {
        this.classNum = classNum
        this._socket = io('https://external.cocotutor.ml/' + classNum)
        this._socket.on('connect', this._onConnect.bind(this))
        this._socket.on('disconnect', this._onDisConnect.bind(this))
        this._socket.on('data', this._onData.bind(this))
        this._socket.on('onClose', this._onClose.bind(this))

        /**
         * temporarily using terminal socket as directory CRUD
         **/
        this._socket.on('onCreate', this._onCreate.bind(this))
        this._socket.on('onRename', this._onRename.bind(this))
        this._socket.on('onDelete', this._onDelete.bind(this))
    }

    sendCommand(command) {
        this._socket.emit('command', command)
    }

    requestCompile(maxDepth) {
        this._socket.emit('run', maxDepth)
    }

    _onConnect() {}

    _onDisConnect() {}

    _onClose() {
        console.log("terminal socket disconnected..., trying reconnect")
        setTimeout(() => this.connect(this.classNum), 2000)
    }

    _onData(data) {
        terminalService.writeTerminal(data)
    }

    _onCreate(file) {
        console.log('onCreate', file)
        Redux.dispatch(editorActions.onCreateFile(file))
    }

    _onRename(file) {
        console.log('onRename', file)
        Redux.dispatch(editorActions.onRenameFile(file))
    }

    _onDelete(file) {
        console.log('onDelete', file)
        const { path, fileName } = file
        const key = path === '/' ? `/${fileName}` : `${path}/${fileName}`
        Redux.dispatch(editorActions.onDeleteFile({ ...file, key }))
    }
}

export default new TerminalSocketService()