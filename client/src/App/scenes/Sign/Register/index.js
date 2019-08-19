import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { createNewUser } from '../../../services/Auth';
import classnames from 'classnames';
import ButtonSubmit from '../../components/ButtonSubmit';
import HeaderSign from '../components/HeaderSign';

import './index.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPass: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]:event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPass: this.state.confirmPass
    }
  
    this.props.createNewUser(newUser, this.props.history);
  }

  render() {
    const errors = this.props.errors;
    return(
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <HeaderSign title='Sign up' desc='Create your Trakercise account' />
              <Form noValidate onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type='username'
                    name='username'
                    className={classnames({'is-invalid': errors.username})}
                    placeholder='Your awesome username.'
                    onChange={this.handleChange}
                  />
                  {errors.username && (
                    <div className='invalid-feedback'>{errors.username}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type='email'
                    name='email'
                    className={classnames({'is-invalid': errors.email})}
                    placeholder='email@example.com'
                    onChange={this.handleChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
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
                    <div className={'invalid-feedback'}>{errors.password}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type='password'
                    name='confirmPass'
                    className={classnames({'is-invalid': errors.confirmPass})}
                    placeholder='Repeat your password'
                    onChange={this.handleChange}
                  />
                  {errors.confirmPass && (
                    <div className={'invalid-feedback'}>{errors.confirmPass}</div>
                  )}
                </FormGroup>
                <ButtonSubmit content="Create account" />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createNewUser })(Register);
