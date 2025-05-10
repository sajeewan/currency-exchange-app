import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userName, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Currency Exchange</h1>
      </div>
      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <span className="user-name">{userName}</span>
            <button className="auth-button logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
          <Link to="/" className="auth-button home">
              Home
            </Link>
            <Link to="/login" className="auth-button login">
              Login
            </Link>
            <Link to="/register" className="auth-button register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;