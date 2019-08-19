import { GET_ERRORS, SET_CURRENT_USER } from '../types';
import axios from 'axios';

export const createNewUser = (data, history) => dispatch => {
  axios
    .post('/api/users/new_user', data)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const loginUser = data => dispatch => {
  axios
    .post('/api/users/login', data)
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: res.data.token
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
