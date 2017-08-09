/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './Login.css'

class Login extends React.Component {

  constructor() {
      super()
      this.state = {
          id: '',
          pwd: '',
      }
  }

  @autobind
  handleSubmit(e) {
    alert("ID = " + this.state.id + "  PWD = " + this.state.pwd);
    e.preventDefault();
  }

  @autobind
  handleIDChange(e) {
    this.setState({ id: e.target.value })
  }

  @autobind
  handlePWDChange(e) {
      this.setState({ pwd: e.target.value })
  }

    render(){
        return (
          <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <fieldset className={styles.filedset}>
                  <legend>Do you want login?</legend><br/>
                  <input className={styles.input} type = "text" name = "ID"  defaultValue = {this.state.id} onChange={this.handleIDChange} /><br/>
                  <input className={styles.input} type = "PASSWORD" name = "PWD" defaultValue = {this.state.pwd} onChange={this.handlePWDChange} /><br/>
                  <input className={styles.input} type = "submit" value = "login" /><br/>
                </fieldset>
              </form>
         </div>
        );
    }
}
export default Login;
