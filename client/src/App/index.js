import React, { Component } from 'react';
import Landing from './scenes/Landing';
import Register from './scenes/Register';
import Login from './scenes/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <div className="App-body container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/new_user" component={Register} />
            <Route exact path='/login' component={Login} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
};
