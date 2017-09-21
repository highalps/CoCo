/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import axios from 'axios'

/* */
import styles from './SignUp.scss'

@withRouter
class SignIn extends React.Component {

    constructor() {
        super()
        this.state = {
            userID: '',
            password:'',
            userEmail:'',
            nickName:''
        }
    }

    onChange(field) {
        return (event) => {
            this.setState({ [field]: event.target.value })
        }
    }

    @autobind
    onSubmit() {
        console.log("onClick");
        axios.post('http://localhost:4001/auth/sign_up',{
            userID: this.state.userID,
            password: this.state.password,
            userEmail: this.state.userEmail,
            nickName: this.state.nickName
        }).then(response => {
            console.log(response.data.msg)
            if (response.data.success) {
                this.props.history.push("/signIn")
            }
            this.setState({msg: response.data.msg});
        });
    }


    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.loginBox}>
                        <h1>회원가입</h1>
                        <input id="userID" type="text" className="validate" placeholder="user ID" onChange={this.onChange('userID')}/>
                        <input id="password" type="password" className="validate" placeholder="Password" onChange={this.onChange('password')}/>
                        <input id="userEmail" type="text" className="validate" placeholder="userEmail" onChange={this.onChange('userEmail')}/>
                        <input id="nickName" type="text" className="validate" placeholder="nickName" onChange={this.onChange('nickName')}/>
                        {this.state.msg}
                        <div className={styles.buttons}>
                            <button type="submit" className={styles.button} onClick={this.onSubmit}>확인</button>
                            <Link className={classNames(styles.button, styles.signIn)} to="signIn">취소</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SignIn