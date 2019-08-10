import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                <Link className="btn btn-lg btn-primary" to="/new_user">
                  Sign Up
                </Link>
                <Link className="btn btn-lg btn-secondary" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
