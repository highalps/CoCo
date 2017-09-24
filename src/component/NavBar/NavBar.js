/* */
import React from 'react';
import { connect } from 'react-redux'
import autobind from 'core-decorators/lib/autobind'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  NavDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';

/* */
import Styles from './NavBar.scss';
import { userActions } from '../../redux/actions'

const mapStateToProps = (state) => ({
    nickName: state.userReducer.nickName,
})

@connect(mapStateToProps)
class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       isOpen: false,
       dropdownOpen: false
    }
  }

  @autobind
  handleClickLogout() {
      this.props.dispatch(userActions.logout())
  }

  toggleNav() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  toggleDrop() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  render() {
    return (
      <div className="topMenu bg-primary">
      <div className={Styles.temp}>
        <Navbar light toggleable>
          <NavbarToggler right onClick={this.toggleNav} />
          <NavbarBrand className="text-white">CoCo</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  className="text-white">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className="text-white">Board</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  className="text-white">Tutoring</NavLink>
              </NavItem>
              <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDrop}>
                <DropdownToggle className="text-white" nav caret>
                  MyPage
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>회원정보</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>질문 및 답변</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>튜터링</DropdownItem>
                </DropdownMenu>
              </NavDropdown>
              <NavItem>
                  {
                    !this.props.nickName
                      ? <NavLink className="text-white" href='/#/signIn'>Login</NavLink>
                      : <NavLink className="text-white" onClick={this.handleClickLogout}>Logout</NavLink>
                  }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
      </div>
    );
  }
}
export default NavBar;
