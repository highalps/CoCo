/* */
import React from 'react';
import autobind from 'core-decorators/lib/autobind'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/* */
import styles from './NavBar.scss';
import { userActions } from '../../redux/actions'

@connect()
class NavBar extends React.Component {
  constructor() {
      super()
      this.state = {
         isOpen: false,
      }
  }

  @autobind
  handleClickLogout() {
      this.props.dispatch(userActions.logout())
  }

  renderLoginButton() {
    if (!this.props.isLogged) {
      return (
          <Link className={styles.button} to="signIn">
            <i className="fa fa-unlock-alt" />
              <span className={styles.name}>로그인</span>
          </Link>
      )
    }
    return (
        <div className={styles.button} onClick={this.handleClickLogout}>
          <i className="fa fa-lock" />
            <span className={styles.name}>로그아웃</span>
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
                <span className={styles.name}>내 정보</span>
            </div>
          </div>
        </div>
    )
  }
}

NavBar.propTypes = {
    isLogged: PropTypes.bool,
}

NavBar.defaultProps = {
    isLogged: false,
}

export default NavBar;
