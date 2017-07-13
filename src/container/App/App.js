/* */
import React from 'react';

/* */
import styles from './App.scss'


class App extends React.Component {
    constructor() {
        super()
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
        });
    }

    render() {
        // return (
        //     <div className={styles.wrapper}>
        //         <p className={styles.text}>Hello World!!!</p>
        //     </div>
        // )
        return (
            <div id="firepad-container" />
        )
    }
}

export default App
