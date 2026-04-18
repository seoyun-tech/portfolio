import React from 'react';
import useModalLock from '../../hooks/useModalLock';
import ContactInfoPanel from '../ContactInfoPanel/ContactInfoPanel';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  useModalLock(onClose);

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>
        <ContactInfoPanel variant="modal" />
      </div>
    </div>
  );
};

export default ContactModal;
