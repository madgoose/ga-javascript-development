import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router' // cherry-picking component of the package

import App from './App'; // javascript files don't need extension added
import Home from './Home'; // javascript files don't need extension added
import Contact from './Contact'; // javascript files don't need extension added
import Questions from './Questions'; // javascript files don't need extension added

import './index.css';

// ReactDOM.render only accepts 1 HTML element in the argument
ReactDOM.render(
	 <Router history={browserHistory}>
	 	<Route path="/" component={App}> {/* if the route is "/" render whatever is passed to component  */}
	 		<IndexRoute component={Home} /> {/* if nothing is passed, render the Home component */}
	 		<Route path="questions" component={Questions} />
	 		<Route path="contact" component={Contact} />
		</Route>

	 </Router>, // this is only possible because we're importing it from line 4
	document.getElementById("root")
);