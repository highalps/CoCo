/* */
import React from 'react'

/* */
import styles from './Home.scss'
import Login from 'component/Login/'
import MainScreen from 'component/MainScreen/'
class Home extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className={styles.wrapper}>
               <Login />
               <MainScreen />
            </div>
        )
    }
}

export default Home
