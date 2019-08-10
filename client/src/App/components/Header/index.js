import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem,
  Nav
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return(
      <header>
        <Navbar color='dark' dark expand='md'>
          <Link className="navbar-brand" to='/'>
            Trakercise
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <Link className='nav-link' to='/new_user'>
                  Sign up
                </Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
};
