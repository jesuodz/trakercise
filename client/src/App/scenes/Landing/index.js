import React, { Component } from 'react';
import { Button } from 'reactstrap';

import './index.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-4 mb-5">
                  Trakercise
                </h1>
                <Button color="primary" size="lg" href="/new_user">
                  Sign Up
                </Button>
                <Button outline color="secondary" size="lg" href="/login">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
