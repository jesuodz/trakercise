import React, { Component } from 'react';
import Landing from './scenes/Landing';
import Register from './scenes/Sign/Register';
import Login from './scenes/Sign/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './scenes/Dashboard';
import { BrowserRouter as Router,
  Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from './services/Auth';
import store from './store';

import './index.css';

if (localStorage.exetrakerToken) {
  console.log(localStorage.exetrakerToken);
  setAuthToken(localStorage.exetrakerToken);
  const decoded = jwt_decode(localStorage.exetrakerToken);
  store.dispatch(setCurrentUser(decoded));
}

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <Router>
            <Header />
            <div className='App-body container'>
              <Route exact path='/' component={Landing} />
              <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Route exact path='/new_user' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
          </Router>
        </Provider>
        <Footer />
      </div>
    );
  }
};
 