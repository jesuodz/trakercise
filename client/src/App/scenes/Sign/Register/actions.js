import { CREATE_NEW_USER } from './types';

export const createNewUser = (data) => dispatch => {
  dispatch({
    type: CREATE_NEW_USER,
    payload: data
  });
}
