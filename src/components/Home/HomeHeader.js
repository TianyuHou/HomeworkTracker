import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import LoginWindow from "./LoginWindow";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaywin: "hide-window",
      warn: "",
      display: "none"
    };
  }

  onClick = () => {
    this.setState({
      displaywin: "show-window"
    });
  };

  renderWarn = msg => {
    this.setState({
      warn: msg,
      display: "block"
    });
  };

  hideWarn = () => {
    this.setState({
      warn: "",
      display: "none"
    });
  };

  closeWindow = () => {
    this.setState({
      displaywin: "hide-window"
    });
    this.hideWarn();
  };

  render() {
    return (
      <div className="home-header">
        <button type="submit" onClick={this.onClick} className="login-btn">
          Login
        </button>
        <NavLink
          to={`/home`}
          className="home-language-text"
          activeClassName="home-language-text-active"
        >
          English
        </NavLink>
        <div className="home-vertical-line" />
        <NavLink
          to={`/home2`}
          className="home-language-text"
          activeClassName="home-language-text-active"
        >
          Español
        </NavLink>

        <LoginWindow
          renderWarn={this.renderWarn}
          hideWarn={this.hideWarn}
          display={this.state.display}
          warn={this.state.warn}
          displaywin={this.state.displaywin}
          close={this.closeWindow}
        />
      </div>
    );
  }
}

export default HomeHeader;
