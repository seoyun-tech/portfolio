import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../constants/social';
import IconCircle from '../../components/IconCircle/IconCircle';
import './ContactPage.css';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page">
      <button className="contact-page-back" onClick={() => navigate(-1)}>
        <IconCircle className="contact-page-back-circle">
          <i className="fa-solid fa-arrow-left" />
        </IconCircle>
      </button>

      <div className="contact-page-inner">
        <p className="contact-page-tag">Get in Touch</p>

        <h1 className="contact-page-title">
          <strong>Let's work</strong>
          <em>together</em>
        </h1>

        <p className="contact-page-desc">
          새로운 기회와 협업에 대해 언제든 환영합니다.<br />
          편하게 연락주세요.
        </p>

        <ul className="contact-page-list">
          <li className="contact-page-item">
            <em className="contact-page-item-title">Call Me</em>
            <a href="tel:01074087823" className="contact-page-item-value">+82 10 7408 7823</a>
          </li>
          <li className="contact-page-item">
            <em className="contact-page-item-title">Write</em>
            <p className="contact-page-item-desc">Or send a direct email at</p>
            <a href="mailto:cielle.sora@gmail.com" className="contact-page-item-value">cielle.sora@gmail.com</a>
          </li>
        </ul>

        <div className="contact-page-social">
          {SOCIAL_LINKS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="contact-page-social-btn"
              aria-label={label}
            >
              <i className={icon} />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
