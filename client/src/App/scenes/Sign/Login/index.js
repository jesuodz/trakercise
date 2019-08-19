import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import { loginUser } from '../../../services/Auth';
import { connect } from 'react-redux';
import ButtonSubmit from '../../components/ButtonSubmit';
import HeaderSign from '../components/HeaderSign';
import FormGroupInput from '../../components/FormGroupInput';

import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(user);
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { errors } = this.state;

    return(
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <HeaderSign title='Log in' desc='Login into your Trakercise account' />
              <Form onSubmit={this.handleSubmit}>
                <FormGroupInput
                  type='username'
                  name='username'
                  placeholder='Username'
                  onChange={this.handleChange}
                  error={errors.username}
                />
                <FormGroupInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <ButtonSubmit content={'Log in'}/>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
