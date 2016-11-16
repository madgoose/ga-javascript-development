import React, { Component } from 'react';

import Header from './Header'

import './App.css';


// setting state on a class-based component
class App extends Component {

  render() {

    return (
      <div className="App">

        <Header /> { /* Header component, self-closing */ }

        { this.props.children } { /* react-router provides access to children of object, in this case {App} */ }

      </div>
    )
  }
}

export default App;