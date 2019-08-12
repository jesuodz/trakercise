import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';

import './index.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPass: '',
      errors: {}
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
  
    axios.post('/api/users/new_user', newUser)
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return(
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <h1 className='display-4 mb-5'>
                Sign up
              </h1>
              <p className='lead'>
                Create your Trakercise account
              </p>
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
                <Button
                  type='submit'
                  color='primary'
                  outline
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
