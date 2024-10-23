// src/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
    <h1>SkillSwapper</h1>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/*<li><Link to="/register">Register</Link></li>*/}
    </ul>
</nav>
  );
};

export default Nav;
