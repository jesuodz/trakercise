import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    return (
      <div>
        { isAuthenticated ? (
            <h1 className="display-1 mb-3">
              Hello! { user.username }
            </h1>
          ) : (
            <Redirect to='/login' />
          )
        }
      </div>
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
