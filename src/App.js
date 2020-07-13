import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Teams from './components/PageComponents/Teams/Teams'
import Roster from './components/PageComponents/Roster/Roster'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <div>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"></i>
              </Link>
            </div>
            <div>
              <p className="Title"><span>N B A</span>ROSTERS</p>
            </div>
            <div>

            </div>
          </nav>
          <Route path="/:teamName" component={Roster} />    
          <Route path="/" exact component={Teams} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
