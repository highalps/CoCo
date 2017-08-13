/* */
import React from 'react'

/* */
import EditorHeader from '../../component/EditorHeader'
import EditorBody from '../../component/EditorBody/'
import EditorFooter from '../../component/EditorFooter/'
import styles from './App.scss'

class App extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
               <EditorHeader />
               <EditorBody />
               <EditorFooter />
            </div>
        )
    }
}

export default App
