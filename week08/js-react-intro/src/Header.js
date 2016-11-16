import React from 'react';
import { Link } from 'react-router';

import HeaderNav from './HeaderNav';

import './Header.css';

import logo from './logo.svg';

const Header = () => (
    <header className="Header">
    <Link to="/">
    	<img
	      src={logo}
	      className="Header-logo"
	      alt=""
    	/>
    </Link>

    <h1>GA Questions</h1>

    <HeaderNav />

  </header>
);

export default Header;