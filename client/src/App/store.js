import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { errorsReducer } from './services/Errors';

const rootReducer = combineReducers({
  errors: errorsReducer
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
