import React from 'react';

const QuestionsForm = props => { // single argument doesn't need parentheses
	return (
	    <form onSubmit={props.handleSubmit}>
	      <input
	        type="text"
	        onChange={props.handleChange}
	        value={props.question}
	      />
	    </form>
	)
};

export default QuestionsForm;