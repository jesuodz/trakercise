import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonLink from '../../components/ButtonLink';

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <h1 className='display-1 mb-3'>
          Hello! { user.username }
        </h1>
        <ButtonLink
          styles={'btn btn-primary'}
          href='/account'
          text='Account'
        />
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
