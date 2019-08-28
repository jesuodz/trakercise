import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonLink from '../../components/ButtonLink';
import { Container, Row, Col } from 'reactstrap';

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <Row>
          <Col md='12'>
            <h1 className='display-1 mb-3'>
              Hello! { user.username }
            </h1>
            <ButtonLink
              styles={'btn btn-primary'}
              href='/account'
              text='Account'
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Dashboard);
