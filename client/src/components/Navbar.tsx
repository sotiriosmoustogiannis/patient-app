import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link nav-title">Patient App</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Add Contact</Link>
        <Link to="/contacts" className="nav-link">Show Contacts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
