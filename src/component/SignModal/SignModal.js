/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import { connect } from 'react-redux'
import classNames from 'classnames'

/* */
import styles from './SignModal.scss'
import Modal from '../Modal'
import Button from '../Button'
import { userActions, uiActions } from '../../redux/actions'

const mapStateToProps = (state) => ({
    isModalOpen: state.uiReducer.uiState.get('signModal')
})

@connect(mapStateToProps)
class SignModal extends React.Component {

    constructor() {
        super()
        this.state = {
            mode: 'signIn',
            id: '',
            password: '',
            email: '',
            nickname: '',
        }
    }

    onChange(field) {
        return (event) => {
            this.setState({ [field]: event.target.value })
        }
    }

    @autobind
    onChangeMode() {
        this.setState({ mode: this.state.mode === 'signIn' ? 'signUp' : 'signIn' })
    }

    @autobind
    handleClose() {
        this.setState({ mode: 'signIn' })
        this.props.dispatch(uiActions.closeSignModal())
    }

    @autobind
    handleButtonClick() {
        const { dispatch } = this.props
        const payload = {
            id: this.state.id,
            password: this.state.password,
            email: this.state.email,
            nickname: this.state.email,
        }
        if (this.state.mode === 'signIn') {
            dispatch(userActions.signIn(payload))
                .then(() => this.props.dispatch(uiActions.closeSignModal()))
                .catch(err => {})
        }
         else {
            dispatch(userActions.signUp(payload))
                .then(() => this.props.dispatch(uiActions.closeSignModal()))
                .catch(err => {})
        }
    }

    render() {
        return (
            <Modal isModalOpen={this.props.isModalOpen}>
                <div className={styles.modal}>
                    <div className={styles.bar} />
                    <div className={styles.close} onClick={this.handleClose}>✕</div>
                    <div className={styles.content}>
                        <h3>{this.state.mode === 'signIn' ? '로그인' : '회원가입'}</h3>
                        <div className={styles.form}>
                            <input
                                value={this.state.id}
                                className={styles.input}
                                onChange={this.onChange('id')}
                                name="ID"
                                placeholder="아이디"/>
                            <input
                                value={this.state.password}
                                className={styles.input}
                                onChange={this.onChange('password')}
                                name="PASSWORD"
                                placeholder="비밀번호"
                                type="password" />
                            {
                                this.state.mode === 'signUp'
                                    ? ( <input
                                    value={this.state.email}
                                    className={styles.input}
                                    onChange={this.onChange('email')}
                                    name="EMAIL"
                                    placeholder="이메일" />)
                                    : null
                            }
                            {
                                this.state.mode === 'signUp'
                                    ? ( <input
                                    value={this.state.nickname}
                                    className={styles.input}
                                    onChange={this.onChange('nickname')}
                                    name="NICKNAME"
                                    placeholder="닉네임" />)
                                    : null
                            }
                        </div>
                        <Button
                            className={styles.login}
                            onClick={this.handleButtonClick}>
                            {this.state.mode === 'signIn' ? '로그인' : '회원가입'}
                        </Button>
                        <div className={styles.foot}>
                            <span
                                className={styles.mode}
                                onClick={this.onChangeMode}>
                                {this.state.mode === 'signIn' ? '회원가입' : '로그인'}
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default SignModal