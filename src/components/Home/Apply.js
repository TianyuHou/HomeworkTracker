import React from 'react';
import { Link } from 'react-router-dom';

const Apply = ({ identity, content }) => {
  return (
    <div className={`apply-content`}>
      <div className={`apply-${identity}`} />
      <h1>Become a {identity}</h1>
      <h2>{content}</h2>
      <Link
        to={{
          pathname: '/Register',
          state: { identity }
        }}
        className="apply-btn"
      >
        Apply<i className="fas fa-chevron-circle-right" />
      </Link>
    </div>
  );
};

export default Apply;
