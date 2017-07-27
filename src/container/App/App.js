/* */
import React from 'react'
import { autobind } from 'core-decorators'

/* */
import styles from './App.scss'


class App extends React.Component {
    constructor() {
        super()
<<<<<<< HEAD
        this._refs = {}
    }

    componentDidMount() {
        setTimeout(this.init, 2000)
    }

    @autobind
    init() {
        // Initialize Firebase.
        var config = {
            apiKey: "AIzaSyDWo8PmzDdnCMFar1925uzfgOryRHY80gM",
            authDomain: "test-aeb4a.firebaseapp.com",
            databaseURL: "https://test-aeb4a.firebaseio.com",
            projectId: "test-aeb4a",
            storageBucket: "test-aeb4a.appspot.com",
            messagingSenderId: "1013150211378"
        };

        window.firebase.initializeApp(config);

        // Get Firebase Database reference.
        var firepadRef = window.firebase.database().ref();

        // Create CodeMirror (with lineWrapping on).
        var codeMirror = window.CodeMirror(this._refs.wrapper, { lineWrapping: true });

        // Create Firepad (with rich text toolbar and shortcuts enabled).
        window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
            richTextShortcuts: true,
            richTextToolbar: true,
            defaultText: 'Hello, World!'
=======
        this.handleOnload = this.handleOnload.bind(this)
    }

    componentDidMount() {
        window.addEventListener('load', this.handleOnload)
    }

    getExampleRef() {
        var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
            ref = ref.child(hash);
        } else {
            ref = ref.push(); // generate unique location.
            window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }
        return ref;
    }

    handleOnload() {
        //// Initialize Firebase.
        //// TODO: replace with your Firebase project configuration.
        var config = {
            apiKey: "AIzaSyC_JdByNm-E1CAJUkePsr-YJZl7W77oL3g",
            authDomain: "firepad-tests.firebaseapp.com",
            databaseURL: "https://firepad-tests.firebaseio.com"
        };
        firebase.initializeApp(config);
        //// Get Firebase Database reference.
        var firepadRef = this.getExampleRef();
        //// Create ACE
        var editor = ace.edit("firepad-container");
        editor.setTheme("ace/theme/textmate");
        var session = editor.getSession();
        session.setUseWrapMode(true);
        session.setUseWorker(false);
        session.setMode("ace/mode/javascript");
        //// Create Firepad.
        var firepad = Firepad.fromACE(firepadRef, editor, {
            defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
>>>>>>> 8f22614c1b67013a09bfab15456dae129e192330
        });
    }

    render() {
        // return (
        //     <div className={styles.wrapper}>
        //         <p className={styles.text}>Hello World!!!</p>
        //     </div>
        // )
        return (
            <div
                ref={e => this._refs.wrapper = e}
                className={styles.wrapper} />
        )
    }
}

export default App
