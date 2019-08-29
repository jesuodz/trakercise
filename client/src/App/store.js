import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { errorsReducer } from './services/Errors';
import { authReducer } from './services/Auth';
import { accountReducer } from './services/Account';

const rootReducer = combineReducers({
  errors: errorsReducer,
  auth: authReducer,
  account: accountReducer
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
