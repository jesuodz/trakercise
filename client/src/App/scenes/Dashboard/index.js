import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ButtonLink from '../../components/ButtonLink';

class Dashboard extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    return (
      <div>
        { isAuthenticated ? (
            <React.Fragment>
              <h1 className='display-1 mb-3'>
                Hello! { user.username }
              </h1>
              <ButtonLink
                styles='btn btn-primary'
                href={'/account'}
                content={'Account'}
              />
            </React.Fragment>
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
