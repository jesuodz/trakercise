import React, { Component } from 'react';

import './index.css';

class Landing extends Component {
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
                <a href="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="/login" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
