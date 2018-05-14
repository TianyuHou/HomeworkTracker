import React from 'react';

const StudentItem = ({ id, name, school, date, comment }) => (
  <div className="stundent-info-container">
    <img src={`/images/${id}.jpg`} className="stundent-info-pic" />
    <div className="stundent-info">
      <div className="stundent-info-title">
        <h3>{name}</h3>
        <h4>{`Graduated from ${school} ${date}`}</h4>
      </div>
      <div className="stundent-info-comment">
        <h4>{comment}</h4>
      </div>
    </div>
  </div>
);

export default StudentItem;
