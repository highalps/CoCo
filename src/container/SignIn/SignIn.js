/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import axios from 'axios'

/* */
import styles from './SignIn.scss'

@withRouter
class SignIn extends React.Component {

	constructor() {
		super()
		this.state = {
			userID: '',
			password:'',
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
		axios.post('http://external.sopad.ml:3000/auth/login',{
			userID: this.state.userID,
			password: this.state.password
		}).then(response => {
			this.props.history.push("/"+response.data.userID)
		}).catch(error => {
			this.setState({msg:'아이디가 존재하지 않거나, 비밀번호가 맞지 않습니다.'})
		});
	}


	render() {
		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.loginBox}>
						<h1>로그인</h1>
						<input id="userID" type="text" className="validate" placeholder="user ID" onChange={this.onChange('userID')}/>
						<input id="password" type="password" className="validate" placeholder="Password" onChange={this.onChange('password')}/>
						{this.state.msg}
						<div className={styles.buttons}>
							<Link className={classNames(styles.button, styles.signUp)} to="signUp">회원가입</Link>
							<button type="submit" className={styles.button} onClick={this.onSubmit}>확인</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default SignIn