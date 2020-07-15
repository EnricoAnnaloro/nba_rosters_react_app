import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Teams from './components/PageComponents/Teams/Teams'
import Roster from './components/PageComponents/Roster/Roster'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Footer from './components/PageComponents/Footer/Footer'
import NavBar from './components/PageComponents/NavBar/NavBar'
import SearchPage from './components/PageComponents/SearchPage/SearchPage'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/search" exact component={SearchPage} />    
            <Route path="/:teamName" component={Roster} />    
          </Switch>
          <Route path="/" exact component={Teams} />
          <ScrollToTop />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
