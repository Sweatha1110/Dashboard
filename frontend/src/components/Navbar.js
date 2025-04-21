import React from "react";

const Navbar = ({ setView, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">Cisco-Meraki</span>
      <div className="navbar-nav ms-auto">
        <button className="btn btn-link nav-item nav-link" onClick={() => setView("home")}>Home</button>
        <button className="btn btn-link nav-item nav-link" onClick={() => setView("request")}>Request Services</button>
        <button className="btn btn-link nav-item nav-link" onClick={() => setView("view")}>View Services</button>
        <button className="btn btn-secondary ms-3" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
