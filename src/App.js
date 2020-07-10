import React, { Component } from 'react';

import Teams from './components/PageComponents/Teams/Teams'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          This is the nav
        </nav>
        <Teams />
      </div>
    );
  }
}

export default App;
