import React from 'react';
import { SOCIAL_LINKS } from '../../constants/social';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p className="footer-copyright">© 2026 All rights reserved by Seoyun Park</p>
        <div className="social-icons">
          {SOCIAL_LINKS.map(({ label, icon, href }) => (
            <a key={label} href={href} className="social-icon" target="_blank" rel="noreferrer" aria-label={label}>
              <i className={icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
