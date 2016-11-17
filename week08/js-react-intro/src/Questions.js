import React, { Component } from 'react';

import QuestionsForm from './QuestionsForm';
import QuestionsItem from './QuestionsItem';

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

        <QuestionsForm
          handleSubmit={this.handleSubmit} // key={value}
          handleChange={this.handleChange}
          question={this.state.question}
        />

        <section className="Questions-questions">

          <div className="Questions-questions-preview">
            <p>{ question ? question : 'Your question preview here'}</p>
          </div>

          <ul className="Questions-questions-list">
            {
              questions.map((item, index) => {  // this would usually be iterating over a JSON object, that would have a name:value pair of ID
                return (<QuestionsItem
                   key={item} // this would be item.id when iterating over JSON object
                   item={item}
                />)
              })
            }

          </ul>

        </section>
      </div>
    )
  }
}

export default Questions;