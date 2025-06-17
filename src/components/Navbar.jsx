import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import { FaHome, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-inner">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <FaHome className="icon" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cek-sentimen" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <FaSearch className="icon" />
              <span>Cek Sentimen</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
