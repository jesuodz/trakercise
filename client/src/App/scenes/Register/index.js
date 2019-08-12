import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

import './index.css';

export default class Register extends Component {
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
  
    axios.post('/api/users/new_user', newUser)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
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
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for='username'>Username</Label>
                  <Input
                    type='username'
                    name='username'
                    id='username'
                    placeholder='Must be between 5 and 50 characters.'
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='example@example.com'
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Must be between 8 and 30 characters.'
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='confirmPass'>Confirm password</Label>
                  <Input
                    type='password'
                    name='confirmPass'
                    id='confirmPass'
                    placeholder='Please repeat your password.'
                    onChange={this.handleChange}
                  />
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
