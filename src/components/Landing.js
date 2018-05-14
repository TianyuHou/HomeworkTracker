import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="landing">
    <div className="landing-header">
      <img src="/images/F2Ewhite.png" />
      <h2>Welcome to F2E!</h2>
      <div className="landing-language">
        <Link to="/home" className="landing-link">
          English
        </Link>
        <Link to="/home2" className="landing-link">
          Español
        </Link>
      </div>
    </div>

    <ul className="landing-slideshow">
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  </div>
);

export default Landing;
