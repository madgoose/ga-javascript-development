import React, { Component } from 'react';
import './App.css';


// setting state on a class-based component
class App extends Component {

  constructor() {
    super();
    this.state = {
      counterValue: 0
    }
    // bind the context of the component to the function calls
    this.increaseCounter = this.increaseCounter.bind(this);
    this.decreaseCounter = this.decreaseCounter.bind(this);
  }

  increaseCounter(e) {
    //console.log("increment");
    e.preventDefault();
    this.setState({
      counterValue: this.state.counterValue + 1
      //counterValue: counterValue + 1
    })
  }

  decreaseCounter(e) {
    //console.log("decrement");
    e.preventDefault();
    this.setState({
      counterValue: this.state.counterValue - 1
      //counterValue: counterValue - 1
    })
  }

  render() {

    //const counterValue = this.state;

    return (
      <div className="App">
        <p>Counter value: {this.state.counterValue}</p>

        <button className="button" onClick={this.increaseCounter}>
          + Increase counter value
        </button>
        <button className="button" onClick={this.decreaseCounter}>
          - Decrease counter value
        </button>
      </div>
      );
  }
}

export default App;
