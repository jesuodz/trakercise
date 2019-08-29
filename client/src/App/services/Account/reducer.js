import { GET_ACCOUNT_DATA } from '../types';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_ACCOUNT_DATA:
      return action.payload
    default:
      return state;
  }
};
