/* */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* */
import styles from './Home.scss'
import NavBar from '../../component/NavBar'

const mapStateToProps = (state) => ({
    isLogged: state.userReducer.isLogged,
    ifTutor: state.userReducer.tutor,
})

@connect(mapStateToProps)
class Home extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
               <NavBar isLogged={this.props.isLogged} ifTutor={this.props.ifTutor}/>
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
