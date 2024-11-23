import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Zoey Hashemi</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/*" className="nav-link">Features</Link>
            </li>

            <li className="nav-item">
              <Link to="/help" className="nav-link">About Us</Link>
            </li>
             <li className="nav-item">
              <Link to="/help" className="nav-link">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/help" className="nav-link">Help</Link>
            </li>
          </ul>
          <Link to="/add" className="btn btn-primary">Add Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
