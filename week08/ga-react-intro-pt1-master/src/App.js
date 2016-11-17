import React, { Component } from 'react';
import logo from './ga-logo.png';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			question: '',
			questions: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			questions: [this.state.question, ...this.state.questions]
		});
		this.setState({question: ''});
	}

	handleChange(e) {
		this.setState({
			question: e.target.value
		});
	}

  render() {
		const { question, questions } = this.state;

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>GA Questions</h1>
        </header>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						onChange={this.handleChange}
						value={question}
					/>
				</form>

				<section className="App-questions">
					<div className="App-questions-preview">
						<p>{question ? question : 'Question preview'}</p>
					</div>

					<ul className="App-questions-list">
						{
							questions.map((item, index) =>
								<li key={index}><p>{item}</p></li>
							)
						}
					</ul>
				</section>

      </div>
    );
  }
}

export default App;
