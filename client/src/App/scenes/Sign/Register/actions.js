import { CREATE_NEW_USER } from './types';

export const createNewUser = data => {
  return {
    type: CREATE_NEW_USER,
    payload: data
  };
};
