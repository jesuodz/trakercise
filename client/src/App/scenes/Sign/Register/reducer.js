import { CREATE_NEW_USER } from './types';

export default (state = {}, action) => {
  switch(action.type) {
    case CREATE_NEW_USER:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};
