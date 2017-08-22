/* */
import React from 'react'
import PropTypes from 'prop-types'
import otText from 'ot-text'
import shareDB from 'sharedb/lib/client'
import shareDBCodeMirror from 'sharedb-codemirror'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/theme/isotope.css'

/* */
import styles from './TextEditor.scss'
import webScoket from '../../../../service/webSocketService'

shareDB.types.map['json0'].registerSubtype(otText.type)

const option = {
    lineNumbers: true,
    lineWrapping: true,
    smartIndent: true,
    mode: 'text/x-c++src',
    theme: 'isotope',
    scrollbarStyle: null,
}

class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this._refs = {}
        this.state = {
            isLoading: true,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.name !== nextProps.name) {
            this.connect(nextProps)
        }
    }

    componentDidMount() {
        this.codeMirror = CodeMirror.fromTextArea(this._refs.textArea, option);
        this.shareConnection = new shareDB.Connection(webScoket.getWebsocket())
        this.connect(this.props)
    }

    connect(props) {
        this.setState({ isLoading: false })
        const fileName = 'tobechange/' + props.name
        const doc = this.shareConnection.get('files', fileName)
        shareDBCodeMirror.attachDocToCodeMirror(doc, this.codeMirror, {
            key: 'content',
            verbose: true
        });

    }

    render() {
        return (
            <div className={styles.wrapper}>
                <textarea
                    className={styles.textArea}
                    ref={e => this._refs.textArea = e} />
            </div>
        )
    }
}

TextEditor.propTypes = {
    name: PropTypes.string,
}

TextEditor.defaultProps = {
    name: '',
}

export default TextEditor
