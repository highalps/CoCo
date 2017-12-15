/* */
import React from 'react'
import PropTypes from 'prop-types'

/* */
import styles from './Home.scss'
import NavBar from '../../component/NavBar'

class Home extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
               <NavBar />
               <div className={styles.main} />
                <div className={styles.intro}>
                    Co-operation Coding
                </div>
                <div className={styles.subIntro}>CoCo에서 원하는 공부를 시작하세요</div>
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
