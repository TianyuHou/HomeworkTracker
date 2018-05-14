import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { Link } from "react-router-dom";
import StudentNavbar from "./Navbar/StudentNavbar";
import MentorNavbar from "./Navbar/MentorNavbar";
import DonorNavbar from "./Navbar/DonorNavbar";

const Header = ({ startLogout, name, identity }) => (
  <div className="header">
    <div className="header-container">
      <div className="header-logout">
        <h4>Welcome Back {name}</h4>
        <a onClick={startLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt" />Logout
        </a>
      </div>
    </div>
    {identity === "student" ? (
      <StudentNavbar />
    ) : identity === "mentor" ? (
      <MentorNavbar />
    ) : (
      <DonorNavbar />
    )}
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = state => ({
  name: `${state.profile.info.firstName} ${state.profile.info.lastName}`,
  identity: state.profile.info.identity
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
