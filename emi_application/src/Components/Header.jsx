import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/emi_logo.png'; 

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-5 py-3">
      <div className="container-fluid px-5">
        <Link to="/" className="navbar-brand fw-bold fs-4 text-dark">
          <i className="bi bi-calculator me-2 text-primary"></i>
          <img src={logo} alt="EMI Logo" height="40" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page"> <i className="bi bi-house-door me-1"></i> Home </Link>
            </li>
            <li className="nav-item">
              <Link to="/user_list" className="nav-link"><i className="bi bi-list-task me-1"></i> EMI List </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};
