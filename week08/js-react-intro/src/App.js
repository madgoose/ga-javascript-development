import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from './logo.svg';
import './App.css';


// setting state on a class-based component
class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt=""
          />
          <h1>GA Questions</h1>
          <nav>
            <ul>
              <li>
                <Link to="questions">Questions</Link> { /* Link requires a route */ }
              </li>
              <li>
                <Link to="contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>

        { this.props.children } { /* react-router provides access to children of object, in this case {App} */ }

      </div>
    )
  }
}

export default App;