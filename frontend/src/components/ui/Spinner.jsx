import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'md' }) => {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-circle" />
    </div>
  );
};

export default Spinner;