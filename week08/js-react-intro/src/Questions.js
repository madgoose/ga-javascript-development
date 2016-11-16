import React, { Component } from 'react';

// setting state on a class-based component
class Questions extends Component {

  constructor() {
    super();
    this.state = {
      question: '',
      questions: []
    }
    // bind the context of the component to the function calls
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      question: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      questions: [ this.state.question, ...this.state.questions] // ... array destructuring in ES6
    })
    this.setState({
      question: ''
    })
  }

  render() {

    const { question, questions } = this.state; // shorthand for: const question = this.state.question

    return (
      <div className="Questions">

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={question}
          />
        </form>
        <section className="Questions-questions">
          <div className="Questions-questions-preview">
            <p>{ question ? question : 'Your question preview here'}</p>
          </div>
          <ul className="Questions-questions-list">
            {
              questions.map((item, index) => {
                return <li key={index}><p>{item}</p></li>
              })
            }
          </ul>
        </section>
      </div>
    )
  }
}

export default Questions;