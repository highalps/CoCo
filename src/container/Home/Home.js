/* */
import React from 'react'

/* */
import styles from './Home.scss'
import NavBar from 'component/NavBar/'
import MainScreen from 'component/MainScreen/'
import Intro  from 'component/Intro/'
import Library  from 'component/Library/'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {isLogIn: true};

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin = () => {
        this.setState({isLogIn : true});
    };
    handleLogout = () => {
        this.setState({isLogIn:false});
    };

    renderPage() {
        if(this.state.isLogIn) {
            return <MainScreen />
        }
        else{
            return <MainScreen />
        }
    }
    render() {
        return (
            <div className={styles.wrapper}>
               <NavBar />
               <Intro />
               <MainScreen/>
               <Library />
            </div>
        )
    }
}

export default Home
