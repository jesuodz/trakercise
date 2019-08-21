import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem,
  Nav
} from 'reactstrap';
import ButtonLink from '../../components/ButtonLink';

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
          <ButtonLink styles='navbar-brand' href='/' text='Trakercise' />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <ButtonLink styles='nav-link' href='/new_user' text='Sign up' />
              </NavItem>
              <NavItem>
                <ButtonLink styles='nav-link' href='/login' text='Login' />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
};
