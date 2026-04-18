import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import IconCircle from '../../components/IconCircle/IconCircle';
import ContactInfoPanel from '../../components/ContactInfoPanel/ContactInfoPanel';
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
          <ContactInfoPanel variant="page" />
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
