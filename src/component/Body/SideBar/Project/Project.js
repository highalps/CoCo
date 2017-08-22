/* */
import React from 'react'
import axios from 'axios'

/* */
import styles from './Project.scss'

class Project extends React.Component {

    constructor() {
        super()
        this._refs = {}
        axios.post('/project', {
        name: 'sopad'
        })
        .then( res => { console.log(JSON.stringify(res.data)) } )
        .catch( res => { console.log(res) } );
    }

    render() {
        return (
            <div
                className={styles.wrapper}>
                프로젝트
            </div>
        )
    }
}

export default Project
