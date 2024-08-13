import React from "react";
import '../styles/Navbar.css';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link title">Take Home App</Link>
      </div>
      <div className="navbar-right">
        <Link to="/contacts" className="nav-link">Show Contacts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
