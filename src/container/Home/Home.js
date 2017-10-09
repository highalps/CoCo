/* */
import React from 'react'

/* */
import styles from './Home.scss'
import NavBar from '../../component/NavBar/'

class Home extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
               <NavBar />
                <div className={styles.main} />
            </div>
        )
    }
}

export default Home
