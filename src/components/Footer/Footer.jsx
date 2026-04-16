import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { lang, setLang } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p className="footer-copyright">© 2026 All rights reserved by Seoyun Park</p>
        <div className="footer-lang">
          <span
            className={lang === 'ko' ? 'active' : ''}
            onClick={() => setLang('ko')}
          >
            Kr.
          </span>
          <span
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            En.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
