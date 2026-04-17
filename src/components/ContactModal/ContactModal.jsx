import React, { useEffect } from 'react';
import { SOCIAL_LINKS } from '../../constants/social';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>

        <button className="contact-modal-close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="contact-modal-inner">
          <p className="contact-modal-tag">Get in Touch</p>

          <h2 className="contact-modal-title">
            <strong>Let's work</strong>
            <em>together</em>
          </h2>

          <p className="contact-modal-desc">
            새로운 기회와 협업에 대해 언제든 환영합니다.<br />
            편하게 연락주세요.
          </p>

          <ul className="contact-modal-list">
            <li className="contact-modal-item">
              <em className="contact-modal-item-title">Call Me</em>
              <a href="tel:01074087823" className="contact-modal-item-value">+82 10 7408 7823</a>
            </li>
            <li className="contact-modal-item">
              <em className="contact-modal-item-title">Write</em>
              <p className="contact-modal-item-desc">Or send a direct email at</p>
              <a href="mailto:cielle.sora@gmail.com" className="contact-modal-item-value">cielle.sora@gmail.com</a>
            </li>
          </ul>

          <div className="contact-modal-social">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="contact-modal-social-btn"
                aria-label={label}
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactModal;
