import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccountData } from '../../../../services/Account';
import { Card, CardBody, Table, Row, Col, Container } from 'reactstrap';  
import Moment from 'react-moment';

class AccountData extends Component {

  componentDidMount() {
    this.props.getAccountData(this.props.user.username);
  };

  render() {
    const { _id, email, date_created } = this.props.account;
    const momentDate = <Moment format="YYYY/MM/DD">{date_created}</Moment>

    return (
      <Container>
        <Row>
          <Col md='2' />
          <Col md='8'>
            <div className='account-data'>
              <Card>
                <CardBody>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <th scope="row">Username</th>
                        <td>{_id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Date created</th>
                        <td>{momentDate}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md='2' />
        </Row>
      </Container>
    );
  }
};

AccountData.propTypes = {
  user: PropTypes.object.isRequired,
  getAccountData: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  account: state.account
});

export default connect(mapStateToProps, { getAccountData })(AccountData);
