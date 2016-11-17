import React, { Component } from 'react';

class QuestionsItem extends Component {

	constructor() {
		super();

		this.state = {
			rating: 0
		}

    	this.increment = this.increment.bind(this);
    	this.decrement = this.decrement.bind(this);
	}

	increment() {
		this.setState({ rating: this.state.rating + 1})
	}

	decrement() {
		this.setState({ rating: this.state.rating - 1})
	}

	render() {

		const { rating } = this.state;

		return (
				<li>
					<p>{this.props.item}</p>

					<div>
						<button onClick={this.decrement}>-</button>
						{ rating }
						<button onClick={this.increment}>+</button>
					</div>
				</li>
			)
	}
}

export default QuestionsItem;