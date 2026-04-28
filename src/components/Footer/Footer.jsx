import SocialLinks from '../SocialLinks/SocialLinks';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container page-container">
      <p className="footer-copyright">© 2026 All rights reserved by Seoyun Park</p>
      <SocialLinks className="social-icons" />
    </div>
  </footer>
);

export default Footer;
