import React from "react";
import { NavLink } from "react-router-dom";

const StudentNavbar = ({ startLogout }) => (
  <div className="nav-bar">
    <NavLink to={`/profile`} className="nav-icon" activeClassName="is-active">
      <i className="fas fa-user-circle" />
      <h3>Profile</h3>
    </NavLink>
    <NavLink to={`/notebook`} activeClassName="is-active" className="nav-icon">
      <i className="fas fa-envelope" />
      <h3>Notebook</h3>
    </NavLink>
    <NavLink to={`/education`} activeClassName="is-active" className="nav-icon">
      <i className="fas fa-graduation-cap" />
      <h3>Education</h3>
    </NavLink>
    <NavLink to={`/financial`} activeClassName="is-active" className="nav-icon">
      <i className="far fa-credit-card" />
      <h3>Financial</h3>
    </NavLink>
  </div>
);

export default StudentNavbar;
