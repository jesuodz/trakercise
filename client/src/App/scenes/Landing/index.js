import React, { Component } from 'react';
import ButtonLink from '../../components/ButtonLink';

import './index.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-1 mb-3">
                  Trakercise
                </h1>
                <p className="lead mb-5">
                  Create your account and start tracking and sharing your exercise progress!
                </p>
                <ButtonLink
                  styles='btn btn-lg btn-primary'
                  href='/new_user'
                  text='Sign up'
                  />
                <ButtonLink
                  styles='btn btn-lg btn-secondary'
                  href='/login'
                  text='Login'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
