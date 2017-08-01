/* */
import React from 'react'

/* */
import Directory from '../../component/Directory/Directory'
import Editor from '../../component/Editor/Editor'
import Terminal from '../../component/Terminal/Terminal'
import styles from './App.scss'

class App extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
               <Directory />
               <Editor />
               <Terminal />
            </div>
        )
    }
}

export default App
