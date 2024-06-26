import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        {type === 'success' ? (
          <FaCheckCircle className="notification-icon success-icon" />
        ) : (
          <FaTimesCircle className="notification-icon error-icon" />
        )}
        <div className="notification-text">
          <strong>{type === 'success' ? 'Sucesso' : 'Erro'}</strong>
          <span>{message}</span>
        </div>
      </div>
      {/* <button onClick={onClose} className="notification-close-button">x</button> */}
    </div>
  );
};

export default Notification;
