/* */
import React from 'react'
import { autobind } from 'core-decorators'

/* */
import styles from './Editor.scss'

const firebaseConfig = {
    apiKey: "AIzaSyDWo8PmzDdnCMFar1925uzfgOryRHY80gM",
    authDomain: "test-aeb4a.firebaseapp.com",
    databaseURL: "https://test-aeb4a.firebaseio.com",
    projectId: "test-aeb4a",
    storageBucket: "test-aeb4a.appspot.com",
    messagingSenderId: "1013150211378"
};

class Editor extends React.Component {
    constructor() {
        super()
        this._refs = {}
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        // TODO: setTimeout 제거하기
        this.setState({ isLoading: true })
        setTimeout(this.init, 2000)
    }

    @autobind
    init() {
        this.setState({ isLoading: false })
        window.firebase.initializeApp(firebaseConfig);

        // Get Firebase Database reference.
        const firepadRef = window.firebase.database().ref();

        // Create CodeMirror (with lineWrapping on).
        const codeMirror = window.CodeMirror(this._refs.wrapper, {
            theme: "blackboard",
            mode: "javascript",
            lineWrapping: true
        });

        // Create Firepad (with rich text toolbar and shortcuts enabled).
        window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
            defaultText: 'Hello, World!'
        });
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
