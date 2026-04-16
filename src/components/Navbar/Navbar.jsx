import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../../constants/social';
import './Navbar.css';

const MENU_ITEMS = ['Home', 'About', 'Project', 'Contact'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">

          <Logo />

          <div className={`nav-content ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-menu">
              {MENU_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <NavActions />
          </div>

          <Hamburger
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </nav>

      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
};

const Logo = () => (
  <div className="navbar-logo">
    <img src="logo.svg" alt="Logo" className="logo-img" />
  </div>
);

const NavActions = () => (
  <div className="navbar-actions">
    <div className="social-icons">
      {SOCIAL_LINKS.map(({ label, icon, href }) => (
        <a key={label} href={href} className="social-icon" target="_blank" rel="noreferrer" aria-label={label}>
          <i className={icon} />
        </a>
      ))}
    </div>
  </div>
);

const Hamburger = ({ isMenuOpen, setIsMenuOpen }) => (
  <div
    className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    <div className="hamburger" />
  </div>
);

export default Navbar;
