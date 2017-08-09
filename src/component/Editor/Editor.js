
/* */
import React from 'react'
import { autobind } from 'core-decorators'
import OtText from 'ot-text'
import ShareDB from 'sharedb/lib/client'
import ShareDBCodeMirror from 'sharedb-codemirror'
/* */
import styles from './Editor.scss'

ShareDB.types.map['json0'].registerSubtype(OtText.type);

const socket = new WebSocket("ws://" + window.location.host);
var shareConnection = new ShareDB.Connection(socket);

var doc = shareConnection.get('users', 'jane');

class Editor extends React.Component {
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
        this.setState({ isLoading: false });

        // Create CodeMirror (with lineWrapping on).
        const codeMirror = window.CodeMirror(this._refs.wrapper, {
            lineNumbers: true,
            lineWrapping: true,
            mode: "javascript"
        });

        console.log (ShareDBCodeMirror.valueOf());
        console.log (doc.type);

        ShareDBCodeMirror.attachDocToCodeMirror(doc, codeMirror, {
            key: 'content',
            verbose: true
        });

        console.log (ShareDBCodeMirror.valueOf());

        codeMirror.setValue("var test = ();")
    }

    render() {
        return (
            this.state.isLoading
                ? <div className={styles.wrapper}>로딩 중...</div>
                : (<div
                    ref={e => this._refs.wrapper = e}
                    className={styles.wrapper} />)
        )
    }
}

export default Editor
