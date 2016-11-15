import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'; // javascript files don't need extension added
import './index.css'; // javascript files don't need extension added

// ReactDOM.render only accepts 1 HTML element in the argument
ReactDOM.render(
	 <App />, // this is only possible because we're importing it from line 4
	document.getElementById("root")
);

