import React from "react";
import { Link } from "react-router-dom"; 
import footerlogo from '../assets/emi_logo.png'; 

export const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-5">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <Link to="/" className="d-flex align-items-center navbar-brand fw-bold fs-4 text-dark">
              <i className="bi bi-calculator me-2 text-primary"></i>
              <img src={footerlogo} alt="EMI Logo" height="40" />
            </Link>
            <p className="text-muted footer-text" style={{ maxWidth: "300px", marginTop: "0.5rem" }}>
              Simplify your loan calculations and track EMI schedules easily with our app.
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <h6 className="fw-bold text-dark">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li>
                <Link to="/user_list" className="text-muted text-decoration-none">EMI List</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h6 className="fw-bold text-dark">Contact</h6>
            <ul className="list-unstyled text-muted">
              <li>Email: support@emicalc.com</li>
              <li>Phone: +91 12345 67890</li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="text-center text-muted">
          &copy; {new Date().getFullYear()} EMI Calculator. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
