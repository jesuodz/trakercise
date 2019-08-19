import { GET_ERRORS } from '../types';
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
