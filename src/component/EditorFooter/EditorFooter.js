/* */
import React from 'react'


/* */
import styles from './EditorFooter.scss'

class EditorFooter extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
           <div
               ref={e => this._refs.wrapper = e}
               className={styles.wrapper} />
        )
    }
}

export default EditorFooter
