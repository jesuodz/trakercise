import React, { Component } from 'react';
import PropTypes from 'prop-types';  
import { Form } from 'reactstrap';
import { connect } from 'react-redux';
import { createNewUser } from '../../../services/Auth';
import ButtonSubmit from '../../components/ButtonSubmit';
import HeaderSign from '../components/HeaderSign';
import FormGroupInput from '../../components/FormGroupInput';

import './index.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPass: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]:event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPass: this.state.confirmPass
    }
  
    this.props.createNewUser(newUser, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return(
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <HeaderSign title='Sign up' desc='Create your Trakercise account' />
              <Form noValidate onSubmit={this.handleSubmit}>
                <FormGroupInput
                  type='username'
                  name='username'
                  placeholder='Your awesome username'
                  onChange={this.handleChange}
                  error={errors.username}
                />
                <FormGroupInput
                  type='email'
                  name='email'
                  placeholder='email@example.com'
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <FormGroupInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <FormGroupInput
                  type='password'
                  name='confirmPass'
                  placeholder='Repeat your password'
                  onChange={this.handleChange}
                  error={errors.confirmPass}
                />
                <ButtonSubmit content="Create account" />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { createNewUser })(Register);
