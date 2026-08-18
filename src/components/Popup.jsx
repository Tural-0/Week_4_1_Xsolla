import React from 'react';
import '../styles/popup.css';

export default function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null; // dont render if closed

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="popup-body">
          {children}
        </div>
      </div>
    </div>
  );
}