/* */
import React from 'react'
import otText from 'ot-text'
import { autobind } from 'core-decorators'
import shareDB from 'sharedb/lib/client'
import shareDBCodeMirror from 'sharedb-codemirror'
import CodeMirror from 'codemirror'

/* */
import styles from './TextEditor.scss'

shareDB.types.map['json0'].registerSubtype(otText.type);
const socket = new WebSocket("ws://" + window.location.host + '/api');
const shareConnection = new shareDB.Connection(socket);
const doc = shareConnection.get('users', 'jane');

class TextEditor extends React.Component {
    constructor() {
        super()
        this._refs = {}
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad)
    }

    @autobind
    handleLoad() {
        this.setState({ isLoading: false })

        const codeMirror = CodeMirror(this._refs.wrapper, {
            lineNumbers: true,
            lineWrapping: true,
            mode: "javascript"
        });

        shareDBCodeMirror.attachDocToCodeMirror(doc, codeMirror, {
            key: 'content',
            verbose: true
        });

        codeMirror.setValue("var test = ();")
    }

    render() {
        return (
            <div
                ref={e => this._refs.wrapper = e}
                className={styles.wrapper} />
        )
    }
}

export default TextEditor
