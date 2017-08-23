/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { Link } from 'react-router-dom'

/* */
import styles from './Login.scss'

class Login extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <Link to={'/sopad'}>
                    <button className={styles.tempBtn}>
                        Sopad 에디터로 가기
                    </button>
                </Link>
                <button className={styles.loginBtn}>
                    Login with Google
                </button>
            </div>
        )
    }
}
export default Login
