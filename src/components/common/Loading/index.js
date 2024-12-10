import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div 
      className="loading-container" 
      role="alert" 
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="loading-spinner">
        <i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading; 