import { GET_ERRORS } from '../types';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
};
