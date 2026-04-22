import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

const MENU_ITEMS = {
  ko: [
    { id: 'home',    label: '홈' },
    { id: 'about',   label: '소개' },
    { id: 'project', label: '프로젝트' },
    { id: 'contact', label: '연락처' },
  ],
  en: [
    { id: 'home',    label: 'Home' },
    { id: 'about',   label: 'About' },
    { id: 'project', label: 'Project' },
    { id: 'contact', label: 'Contact' },
  ],
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang } = useLanguage();

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

          <NavActions />

          <Logo />

          <div className={`nav-content ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-menu">
              {MENU_ITEMS[lang].map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
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
  <a href="#home" className="navbar-logo">
    <img src="logo.svg" alt="Logo" className="logo-img" />
  </a>
);

const NavActions = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="navbar-actions">
      <div className="lang-switcher">
        <span
          className={lang === 'ko' ? 'active' : ''}
          onClick={() => { setLang('ko'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          Kr.
        </span>
        <span
          className={lang === 'en' ? 'active' : ''}
          onClick={() => { setLang('en'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          En.
        </span>
      </div>
    </div>
  );
};

const Hamburger = ({ isMenuOpen, setIsMenuOpen }) => (
  <div
    className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    <div className="hamburger" />
  </div>
);

export default Navbar;
