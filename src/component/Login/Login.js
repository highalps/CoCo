/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { Link } from 'react-router-dom'

/* */
import styles from './Login.scss'

class Login extends React.Component {
    constructor(){
      super()
    }


    @autobind
    handleClick() {
        window.location.href = "/login/auth/google"
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Link to={'/sopad'}>
                    <button className={styles.tempBtn}>
                        Sopad 에디터로 가기
                    </button>
                </Link>
                <button className={styles.loginBtn} onClick = {this.handleClick}>
                    Login with Google
                </button>
]           </div>

        )
    }
}
export default Login
