/* */
import React from 'react'
import otText from 'ot-text'
import shareDB from 'sharedb/lib/client'
import shareDBCodeMirror from 'sharedb-codemirror'
import CodeMirror from 'codemirror'

/* */
import styles from './Editor.scss'

shareDB.types.map['json0'].registerSubtype(otText.type)
const socket = new WebSocket("ws://" + window.location.host)
const shareConnection = new shareDB.Connection(socket)
const doc = shareConnection.get('users', 'jane')

class Editor extends React.Component {
    constructor() {
        super()
        this._refs = {}
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        this.setState({ isLoading: false })

        // Create CodeMirror (with lineWrapping on).
        const codeMirror = CodeMirror(this._refs.wrapper, {
            lineNumbers: true,
            lineWrapping: true,
            mode: "javascript"
        });

        console.log ("A",shareDBCodeMirror.valueOf())
        console.log ("B",doc.type)

        shareDBCodeMirror.attachDocToCodeMirror(doc, codeMirror, {
            key: 'content',
            verbose: true
        });

        console.log ("C",shareDBCodeMirror.valueOf())

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
