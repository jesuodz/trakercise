import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { registerReducer } from './services/api/';

const rootReducer = combineReducers({
  auth: registerReducer
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
