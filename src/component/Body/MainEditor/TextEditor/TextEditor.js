/* */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import otText from 'ot-text'
import shareDB from 'sharedb/lib/client'
import shareDBCodeMirror from 'sharedb-codemirror'
import CodeMirror from 'codemirror'
import io from 'socket.io-client'
import classNames from 'classnames'

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
        if (this.props.currentFileName !== nextProps.currentFileName) {
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
        const classNum = this.props.match.params.classId
        const fileName = '/' + props.currentFileName
        const doc = this.shareConnection.get(classNum, fileName)
        shareDBCodeMirror.attachDocToCodeMirror(doc, this.codeMirror, {
            key: 'content',
            verbose: false
        });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={classNames(styles.blackBoard, { [styles.hidden]: this.props.currentFileName} )} />
                <textarea
                    className={styles.textArea}
                    ref={e => this._refs.textArea = e} />
            </div>
        )
    }
}

TextEditor.propTypes = {
    currentFileName: PropTypes.string,
}

TextEditor.defaultProps = {
    currentFileName: '',
}

export default TextEditor
