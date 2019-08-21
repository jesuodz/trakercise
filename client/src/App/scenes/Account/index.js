import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Account extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    return (
      <div>
        {
          (isAuthenticated) ? (
            <p>{user.username}</p>
          ) : (
            <Redirect to='/login' />
          )
        }    
      </div>
    );
  }
}

Account.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Account);
