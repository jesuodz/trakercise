import { SET_CURRENT_USER, GET_ERRORS, GET_ACCOUNT_DATA } from '../types';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

export const deleteAccount = () => dispatch => {
  localStorage.removeItem('exetrakerToken');
  axios
    .delete('/api/users/account')
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const logoutAccount = () => dispatch => {
  localStorage.removeItem('exetrakerToken');
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  window.location.href='/login';
};

export const getAccountData = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(res => {
      const { password, ...userData } = res.data;
      dispatch({
        type: GET_ACCOUNT_DATA,
        payload: userData
      })
    });
};
