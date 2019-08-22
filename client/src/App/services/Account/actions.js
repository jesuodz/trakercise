import { SET_CURRENT_USER, GET_ERRORS } from '../types';
import axios from 'axios';

export const deleteAccount = () => dispatch => {
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
}
