import React from 'react'
import styles from './Login.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {

	constructor() {
		super()
		this.state = {userID: '', password:'', errors : ''};

		this.userIDChange = this.userIDChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.validate = this.validate.bind(this);
	}

	userIDChange(event){
		this.setState({userID: event.target.value});
	}
	passwordChange(event){
		this.setState({password: event.target.value});
	}

	onSubmit = () =>{
		let err = this.validate();
		if(err.length !== 0) {
			this.setState({
				errors: err
			});
		}
		else{
			axios.post('/login',{
				userID: this.state.userID,
				password: this.state.password
			}).then(response => {console.log(response)})
			.catch (response => {console.log(response)});
		}
	}

	validate = () =>{
		let err = {}
		if(this.state.userID === '') {
			err.userID = "UserID is required";
		}
		if(this.state.password === '') {
			err.password = "Password is required";
		}
		return err;
	}

	render() {
		return (
			<div className={styles.auth}>
				<div className={styles.card}>
					<div className="header blue white-text center">
						<div className={styles.card}>로그인</div>
					</div>
					<form method="post" action = "/login" onSubmit={this.onSubmit}>
						<div className={styles.card}>
							<div className={styles.row}>
								<div className="input-field col s12 username">
									<input
										name="userID"
										ref = "userID"
										type="text"
										className="validate"
										placeholder="user ID"
										onChange={this.userIDChange}
									/>
								</div>
								<div className="input-field col s12">
									<input
										name="password"
										ref = "password"
										type="password"
										className="validate"
										placeholder="Password"
										onChange={this.passwordChange}
									/>
								</div>
								<button type="submit" className="btn btn-default" >확인</button>
							</div>
						</div>
					</form>
					<div className={styles.footer}>
						<div className={styles.card}>
							<div className="right" >
								계정이 없으세요? <Link to="/sign_up">회원가입</Link>
							</div>
						</div>
					</div>
					{this.state.errors.userID}
					<br/>
					{this.state.errors.password}
				</div>
			</div>
		)
	}
}

export default Login