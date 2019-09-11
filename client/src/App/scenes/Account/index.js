import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../services/Account';
import { Button, Container, Row, Col } from 'reactstrap';
import AccountData from './components/AccountData';

/**
 * TODO
 * 
 * - Edit button
 */

class Account extends Component {
  
  deleteHandler = () => {
    this.props.deleteAccount();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md='12'>
            <AccountData />
            <Button
              color='danger' 
              onClick={this.deleteHandler}
              outline
            >
              Delete account
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

Account.propTypes = {
  deleteAccount: PropTypes.func.isRequired
};

export default connect(null, { deleteAccount })(Account);
