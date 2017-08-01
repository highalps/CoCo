/* */
import React from 'react'

/* */
import styles from './Directory.scss'

class App extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                하이하이
                <i className="fa fa-chevron-right" />
            </div>
        )
    }
}

export default App
