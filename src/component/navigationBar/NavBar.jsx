import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Currency Exchange</h1>
      </div>
      
      <div className="navbar-auth">
        <a href="#" className="auth-button login">Login</a>
        <a href="#" className="auth-button register">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;