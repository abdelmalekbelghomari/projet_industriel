import React from 'react';
import './ProfileModal.css';

const ProfileModal = ({ progress, title, subtitle, children, onClose, onNext, nextLabel = 'Suivant' }) => {
  return (
    <div className="profile-modal">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="modal-body">{children}</div>
        <button className="next-button" onClick={onNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
