/* */
import React from 'react'
import { autobind } from 'core-decorators'

/* */
import styles from './App.scss'

const firebaseConfig = {
    apiKey: "AIzaSyDWo8PmzDdnCMFar1925uzfgOryRHY80gM",
    authDomain: "test-aeb4a.firebaseapp.com",
    databaseURL: "https://test-aeb4a.firebaseio.com",
    projectId: "test-aeb4a",
    storageBucket: "test-aeb4a.appspot.com",
    messagingSenderId: "1013150211378"
};

class App extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    componentDidMount() {
        // TODO: setTimeout 제거하기
        setTimeout(this.init, 2000)
    }

    @autobind
    init() {
        window.firebase.initializeApp(firebaseConfig);

        // Get Firebase Database reference.
        var firepadRef = window.firebase.database().ref();

        // Create CodeMirror (with lineWrapping on).
        var codeMirror = window.CodeMirror(this._refs.wrapper, { lineWrapping: true });

        // Create Firepad (with rich text toolbar and shortcuts enabled).
        window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
            richTextShortcuts: true,
            richTextToolbar: true,
            defaultText: 'Hello, World!'
        });
    }

    render() {
        return (
            <div
                ref={e => this._refs.wrapper = e}
                className={styles.wrapper} />
        )
    }
}

export default App
