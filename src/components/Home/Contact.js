import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-info-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <div className="vertical-line" />
          <div className="contact-table">
            <div>
              <i className="fas fa-phone" />
              Phone: <span>12345678</span>
            </div>
            <div>
              <i className="fas fa-envelope" />Email: <span>F2E@gmail.com</span>
            </div>
            <div>
              <i className="fas fa-map-marker" />Address:{' '}
              <span>123Ne,Seattle,WA,98103</span>
            </div>
          </div>
        </div>
        <div className="social-media">
          <div className="social-media-icon">
            <i className="fab fa-twitter-square" />
            <i className="fab fa-facebook-square" />
            <i className="fab fa-instagram" />
            <i className="fab fa-linkedin" />
          </div>
          {/* <hr /> */}
          <h2>Follow Us</h2>
        </div>
      </div>

      <div className="copy-right">
        <hr />
        <h5>Copyright © 2018 F2E Inc. All rights reserved</h5>
      </div>
    </div>
  );
};

export default Contact;
