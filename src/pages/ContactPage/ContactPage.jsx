import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { SOCIAL_LINKS } from '../../constants/social';
import { useLanguage } from '../../context/LanguageContext';
import IconCircle from '../../components/IconCircle/IconCircle';
import './ContactPage.css';

const PLACEHOLDERS = {
  ko: {
    name: '이름을 입력해 주세요.',
    email: '이메일 주소',
    message: '채용 문의, 협업 제안 등 편하게 말씀해 주세요.',
  },
  en: {
    name: "What's your name?",
    email: 'Email address',
    message: 'Feel free to leave any hiring inquiries or collaboration proposals.',
  },
};

const ContactPage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const ph = PLACEHOLDERS[lang];
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      .then(() => { setStatus('success'); formRef.current.reset(); })
      .catch(() => setStatus('error'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="contact-page">
      <button className="contact-page-back" onClick={() => navigate(-1)}>
        <IconCircle className="contact-page-back-circle">
          <i className="fa-solid fa-arrow-left" />
        </IconCircle>
      </button>

      <div className="contact-page-inner">

        <div className="contact-info">
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
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="contact-page-social-btn" aria-label={label}>
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-row">
            <input className="contact-form-input" type="text" name="user_name"
              placeholder={ph.name} autoComplete="off" required />
            <input className="contact-form-input" type="email" name="user_email"
              placeholder={ph.email} autoComplete="off" required />
          </div>
          <textarea className="contact-form-textarea" name="message"
            placeholder={ph.message} autoComplete="off" rows={6} required />
          <button className="contact-form-btn" type="submit" disabled={loading}>
            {loading ? 'Sending...' : '— Send Message'}
          </button>
          {status === 'success' && <p className="contact-form-feedback success">메시지가 전송되었습니다.</p>}
          {status === 'error'   && <p className="contact-form-feedback error">전송에 실패했습니다. 다시 시도해 주세요.</p>}
        </form>

      </div>
    </div>
  );
};

export default ContactPage;
