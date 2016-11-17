import React from 'react';
import { Link } from 'react-router';

import './HeaderNav.css';

const HeaderNav = () => (

    <nav className="HeaderNav">
      <ul>
        <li>
          <Link
            to="questions"
            activeClassName="active">
              Questions
          </Link> { /* Link requires a route */ }
        </li>
        <li>
          <Link
            to="contact"
            activeClassName="active">
              Contact
          </Link>
        </li>
      </ul>
    </nav>
);

export default HeaderNav;