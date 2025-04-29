import React from "react";
import "./Navbar.css"
const Navbar = ({ setView, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
      <span className="navbar-brand">Cisco-Meraki</span>
      <div className="navbar-nav ms-auto">
        <button className="btn btn-link nav-item nav-link" onClick={() => setView("home")}>Home</button>
        <button className="btn btn-link nav-item nav-link" onClick={() => setView("request")}>Request Services</button>
        <button className="btn btn-link nav-item nav-link" onClick={() => setView("view")}>View Services</button>
        <button className="btn btn-primary ms-3" onClick={onLogout}>Logout</button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
