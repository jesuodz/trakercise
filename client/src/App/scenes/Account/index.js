import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Account extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <p>{user.username}</p> 
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
