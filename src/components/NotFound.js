import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found">
      <div className="not-found-content">
        <h3>We are still building it...</h3>
        <h3> Thank you for your patience!</h3>
        <div>
          <Link to="/home">
            Click Here Back <i className="fas fa-hand-point-left" />
          </Link>
        </div>
      </div>
      <div className="not-found-nopage">
        <h1>404</h1>
        <h1>NOT FOUND!</h1>
      </div>
    </div>
  </div>
);

export default NotFound;
