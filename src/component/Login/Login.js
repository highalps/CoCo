/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './Login.css'

class Login extends React.Component {
    render(){
        return (
          <div>
            <button className={styles.loginBtn}>
              Login with Google
            </button>
          </div>
        );
    }
}
export default Login;
