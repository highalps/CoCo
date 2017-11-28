/* */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import otText from 'ot-text'
import shareDB from 'sharedb/lib/client'
import shareDBCodeMirror from 'sharedb-codemirror'
import CodeMirror from 'codemirror'
import io from 'socket.io-client'

/* */
import styles from './TextEditor.scss'

shareDB.types.map['json0'].registerSubtype(otText.type)

const option = {
    lineNumbers: true,
    lineWrapping: true,
    smartIndent: true,
    mode: 'text/x-c++src',
    theme: 'isotope',
    scrollbarStyle: null
}

@withRouter
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
        this.shareConnection = new shareDB.Connection(new WebSocket("wss://" + 'external.cocotutor.ml'));
        this.connect(this.props)
    }

    connect(props) {
        this.setState({ isLoading: false })
        const classNum = this.props.location.pathname.split('editor')[1]
        const fileName = classNum + '/' + props.name
        const doc = this.shareConnection.get('files', fileName)
        shareDBCodeMirror.attachDocToCodeMirror(doc, this.codeMirror, {
            key: 'content',
            verbose: false
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
