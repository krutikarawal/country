import React from 'react';
import './Header.css';
import Logout from '../Authentication/Logout';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
      <div className="header">
        <NavLink to="/" className="logo">
          <img src="/path-to-your-logo/logo.jpg" alt="CountryLogo" /> {/* Replace with your logo path */}
        </NavLink>
        <div className="header-right">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Header;
