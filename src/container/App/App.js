/* */
import React from 'react'

/* */
import Header from '../../component/Header'
import Body from '../../component/Body'
import Footer from '../../component/Footer'
import styles from './App.scss'

class App extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
               <Header />
               <Body />
               <Footer />
            </div>
        )
    }
}

export default App
