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
            <div className={styles.logo}>SopadLogo</div>
            <ul className={styles.topMenu}>
              <li><a href = "/#/sopad">SoPad</a></li>
              <li><a href = "http://external.sopad.ml:3000/api/auth/google">Google로그인</a></li>
            </ul>
          </div>
        )
    }
}
export default Login
