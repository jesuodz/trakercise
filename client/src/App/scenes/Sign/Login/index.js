import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input } from 'reactstrap';
import { loginUser } from '../../../services/Auth';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ButtonSubmit from '../../components/ButtonSubmit';
import HeaderSign from '../components/HeaderSign';

import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  render() {
    const errors = this.props.errors;

    return(
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <HeaderSign title='Log in' desc='Login into your Trakercise account' />
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type='username'
                    name='username'
                    className={classnames({'is-invalid': errors.username})}
                    placeholder='Username'
                    onChange={this.handleChange}
                  />
                  {errors.username && (
                    <div className='invalid-feedback'>{errors.username}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type='password'
                    name='password'
                    className={classnames({'is-invalid': errors.password})}
                    placeholder='Password'
                    onChange={this.handleChange}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                </FormGroup>
                <ButtonSubmit content={'Log in'}/>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
