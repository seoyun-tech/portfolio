import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import ContactInfoPanel from './ContactInfoPanel';
import './ContactDrawer.css';

const PLACEHOLDERS = {
  ko: {
    name: '이름을 입력해 주세요.',
    email: 'example@domain.com',
    message: '채용 문의, 협업 제안 등 편하게 말씀해 주세요.',
    sending: '전송 중...',
    send: '— 메시지 보내기',
  },
  en: {
    name: "Please enter your name",
    email: 'example@domain.com',
    message: 'Please feel free to share your recruitment inquiries or collaboration proposals.',
    sending: 'Sending...',
    send: '— Send Message',
  },
};

const ContactDrawer = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const ph = PLACEHOLDERS[lang];
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
    <>
      <div className={`cd-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      <div className={`cd-panel ${isOpen ? 'open' : ''}`}>
        <button className="cd-close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        <div className="cd-inner">
          <div className="cd-info">
            <ContactInfoPanel variant="page" />
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="cd-form">
            <div className="cd-form-row">
              <input className="cd-form-input" type="text" name="user_name"
                placeholder={ph.name} autoComplete="off" required />
              <input className="cd-form-input" type="email" name="user_email"
                placeholder={ph.email} autoComplete="off" required />
            </div>
            <textarea className="cd-form-textarea" name="message"
              placeholder={ph.message} autoComplete="off" rows={4} required />
            <button className="cd-form-btn" type="submit" disabled={loading}>
              {loading ? ph.sending : ph.send}
            </button>
            {status === 'success' && <p className="cd-form-feedback success">메시지가 전송되었습니다.</p>}
            {status === 'error'   && <p className="cd-form-feedback error">전송에 실패했습니다. 다시 시도해 주세요.</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactDrawer;
