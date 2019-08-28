import React, { Component } from 'react';
import ButtonLink from '../../components/ButtonLink';
import { Container, Row, Col } from 'reactstrap';

import './index.css';

export default class Landing extends Component {
  render() {
    return (
      <Container className="landing">
        <Row>
          <Col md='12' className='text-center'>
            <h1 className="display-3 mb-3">
              Trakercise
            </h1>
            <p className="lead mb-5">
              Create your account and start tracking and sharing your exercise progress!
            </p>
            <ButtonLink
              styles='btn btn-lg btn-primary mr-2' 
              href='/new_user'
              text='Sign up'
              />
            <ButtonLink
              styles='btn btn-lg btn-secondary mr-2' 
              href='/login'
              text='Login'
            />
          </Col>
        </Row>
      </Container>
    );
  };
};
