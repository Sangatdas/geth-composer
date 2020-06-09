import React, { Component } from 'react';

import './App.css';

import TitleBar from './components/titlebar.component';
import NavTabs from './components/navtabs.component';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TitleBar />
        <NavTabs />
      </div>
    );  
  }
}

export default App;
