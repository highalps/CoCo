/* */
import React from 'react'


/* */
import styles from './Footer.scss'

class Footer extends React.Component {
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

export default Footer
