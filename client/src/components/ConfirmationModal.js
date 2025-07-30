import React from 'react';
import Modal from './Modal';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <Modal onClose={onCancel}>
      <div className="confirmation-modal">
        <p>{message}</p>
        <div className="confirmation-actions">
          <button onClick={onCancel} className="btn btn-secondary">No</button>
          <button onClick={onConfirm} className="btn btn-delete-confirm">Yes</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;