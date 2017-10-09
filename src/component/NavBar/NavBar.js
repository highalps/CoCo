/* */
import React from 'react';
import { connect } from 'react-redux'
import autobind from 'core-decorators/lib/autobind'
import { Link } from 'react-router-dom'

/* */
import styles from './NavBar.scss';
import { userActions } from '../../redux/actions'

const mapStateToProps = (state) => ({
    isLogged: state.userReducer.isLogged,
})

@connect(mapStateToProps)
class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       isOpen: false,
    }
  }

  @autobind
  handleClickLogout() {
      this.props.dispatch(userActions.logout())
  }

  renderLoginButton() {
    if (this.props.isLogged) {
      return (
          <Link className={styles.button} to="signIn">
            <i className="fa fa-unlock-alt" />
            로그인
          </Link>
      )
    }
    return (
        <div className={styles.button} onClick={this.handleClickLogout}>
          <i className="fa fa-lock" />
          로그아웃
        </div>
    )
  }

  render() {
    return (
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            CoCo tutor
          </div>
          <div className={styles.menu}>
              {this.renderLoginButton()}
            <div className={styles.button}>
                <i className="fa fa-user-o" />
                내 정보
            </div>
          </div>
        </div>
    )
  }
}
export default NavBar;
