import React from "react";

const ErrorMessage = ({ message, display }) => (
  <div className="error-message" style={{ display: `${display}` }}>
    <h3>{message}</h3>
  </div>
);

export default ErrorMessage;
