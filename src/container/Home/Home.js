/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* */
import styles from './Home.scss'
import NavBar from '../../component/NavBar'

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

Home.propTypes = {
    isLogged: PropTypes.bool,
}

Home.defaultProps = {
    isLogged: false,
}

export default Home
