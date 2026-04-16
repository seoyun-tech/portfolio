import React from 'react';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.css';

const CONTENT = {
  ko: {
    desc: <>새로운 기회와 협업에 대해 언제든 환영합니다.<br />편하게 연락주세요.</>,
  },
  en: {
    desc: <>I'm always open to new opportunities and collaborations.<br />Feel free to reach out anytime.</>,
  },
};

const Contact = () => {
  const { lang } = useLanguage();

  return (
    <section className="contact-section" id="contact">
      <VideoBackground
        videoOpacity={0.25}
        overlay="linear-gradient(190deg, rgba(30, 40, 35, 0.75) 0%, var(--color-dark) 100%)"
      />

      <div className="contact-inner">
        <h2 className="contact-title">
          <strong>Get in</strong>
          <br />
          <em>Touch</em>
        </h2>

        <p className="contact-desc">{CONTENT[lang].desc}</p>

        <div className="contact-info-bar">
          <a href="tel:+821074087823" className="contact-phone">+82 10 7408 7823</a>
          <div className="contact-vdivider" />
          <a href="mailto:cielle.sora@gmail.com" className="contact-email">cielle.sora@gmail.com</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
