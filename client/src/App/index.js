import React, { Component } from 'react';
import Landing from './scenes/Landing';
import Header from './components/Header';
import Footer from './components/Footer';

import './index.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <Landing />
        </div>
        <Footer />
      </div>
    );
  }
};
