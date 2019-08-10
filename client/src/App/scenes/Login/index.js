import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import './index.css';

export default class Login extends Component {
  render() {
    return(
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <h1 className='display-4 mb-5'>
                Login
              </h1>
              <p className='lead'>
                Login into your Trakercise account
              </p>
              <Form>
                <FormGroup>
                  <Input type='username' name='username' id='username' placeholder='Username' />
                </FormGroup>
                <FormGroup>
                  <Input type='password' name='password' id='password' placeholder='Password' />
                </FormGroup>
                <Button type='submit' color='primary' outline>Log in</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
