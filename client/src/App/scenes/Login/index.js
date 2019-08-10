import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import './index.css';

export default class Login extends Component {
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
    console.log(user);
  }

  render() {
    return(
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <h1 className='display-4 mb-5'>
                Log in
              </h1>
              <p className='lead'>
                Login into your Trakercise account
              </p>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type='username'
                    name='username'
                    id='username'
                    placeholder='Username'
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button
                  type='submit'
                  color='primary'
                  outline
                >
                  Log in
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
