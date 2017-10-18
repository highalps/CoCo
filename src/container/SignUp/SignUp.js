/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

/* */
import styles from './SignUp.scss'
import { userActions } from '../../redux/actions'

@connect()
@withRouter
class SignIn extends React.Component {

    constructor() {
        super()
        this.state = {
            id: '',
            password:'',
            email:'',
            nickname:''
        }
    }

    onChange(field) {
        return (event) => {
            this.setState({ [field]: event.target.value })
        }
    }

    @autobind
    onSubmit() {
        const { history, dispatch } = this.props
        const payload = {
            id: this.state.id,
            password: this.state.password,
            email: this.state.email,
            nickname: this.state.nickname
        }

        dispatch(userActions.signUp(payload))
            .then(() => {
                history.push("/signIn")
            })
            .catch(error => {
                this.setState({msg: '아이디가 존재하지 않거나, 비밀번호가 맞지 않습니다.'})
            })
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.loginBox}>
                        <h1>회원가입</h1>
                        <input id="id" type="text" className="validate" placeholder="id" onChange={this.onChange('id')}/>
                        <input id="password" type="password" className="validate" placeholder="Password" onChange={this.onChange('password')}/>
                        <input id="email" type="text" className="validate" placeholder="email" onChange={this.onChange('email')}/>
                        <input id="nickname" type="text" className="validate" placeholder="nickname" onChange={this.onChange('nickname')}/>
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